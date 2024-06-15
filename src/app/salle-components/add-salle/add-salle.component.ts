import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Salle } from 'src/app/core/models/salle';
import { TypeSalle } from 'src/app/core/models/typeSalle';
import { ConsumerGSService } from 'src/app/core/services/consumer-gs.service';

@Component({
  selector: 'app-add-salle',
  templateUrl: './add-salle.component.html',
  styleUrls: ['./add-salle.component.css']
})
export class AddSalleComponent {
  id!: string;
  sa!: Salle;
  selectedFile: File | null = null;
  listSalles: Salle[] = [];
  ListTypeSalles:TypeSalle[] = [];

  constructor(
    private SCGS : ConsumerGSService,
    private router: Router,
    private ar: ActivatedRoute
  ) {
    this.id = this.ar.snapshot.params['id'];

    // Fetch the list of salles
    this.SCGS.getSalles().subscribe({
      next: (response) => {
        console.log('Fetched salles:', response);
        this.listSalles = response;
        console.log('listSalles:', this.listSalles);
      },
      error: (error) => {
        console.error('Error fetching salles:', error);
      },
    });

    // Fetch the list of typeSalles
    this.SCGS.getTypeSalles().subscribe({
      next: (response) => {
        console.log('Fetched typeSalles:', response);
        this.ListTypeSalles = response;
      },
      error: (error) => {
        console.error('Error fetching typeSalles:', error);
      }
    });

    // Fetch salle by id if id is defined
    if (this.id != undefined) {
      this.SCGS.getSalleById(this.id).subscribe({
        next: (data) => {
          this.salle.patchValue({
            nomSalle: data.nomSalle,
            description: data.description,
            lieu: data.lieu,
            prix: data.prix,
            image: data.image,
            typeSalle: data.typeSalle,
          });
          this.sa = data;
        },
      });
    }
  }
  ngOnInit(): void {}
  onFileChange(event: any) {
    this.selectedFile = event.target.files[0];
  }

  salle: FormGroup = new FormGroup({
    nomSalle: new FormControl(''),
    description: new FormControl(''),
    lieu: new FormControl(''),
    prix: new FormControl(''),
    image: new FormControl(this.selectedFile),
    typeSalle: new FormControl('')
  });

  add() {
    const formData:FormData= new FormData();
    formData.append('nomSalle', this.salle.get('nomSalle')?.value);
    formData.append('description', this.salle.get('description')?.value);
    formData.append('lieu', this.salle.get('lieu')?.value);
    formData.append('prix', this.salle.get('prix')?.value);
       formData.append('typeSalle', this.salle.get('typeSalle')?.value);
    if (this.selectedFile) {
      formData.append('image', this.selectedFile, this.selectedFile.name);
    }

    if (this.id != undefined){
       this.SCGS.updateSalle(this.id, this.salle.value).subscribe({
          next: () => this.router.navigate(['/salle']),
          error: (e) => alert(e.message),
       })
        }else {

          this.SCGS.addSalle(formData).subscribe({
          next:() => this.router.navigate(['/salle']),
          error: (e) => alert(e.message),
        });
      }
    }

   
  }