import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Salle } from 'src/app/core/model/salle';
import { TypeSalle } from 'src/app/core/model/typeSalle';
import { ConsumerGSService } from 'src/app/core/services/consumer-gs.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-addsalle',
  templateUrl: './addsalle.component.html',
  styleUrls: ['./addsalle.component.scss']
})
export class AddsalleComponent implements OnInit {


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
    nomSalle: new FormControl('',Validators.required),
    description: new FormControl('',Validators.required),
    lieu: new FormControl('',Validators.required),
    prix: new FormControl('',Validators.required),
    image: new FormControl(this.selectedFile),
    typeSalle: new FormControl('',Validators.required)
  });

  // add() {
  //   if (this.salle.invalid) {
  //     Swal.fire({
  //       icon: 'error',
  //       title: 'Erreur',
  //       text: 'Veuillez remplir tous les champs requis.'
  //     });
  //     return;
  //   }
  //   const formData:FormData= new FormData();
  //   formData.append('nomSalle', this.salle.get('nomSalle')?.value);
  //   formData.append('description', this.salle.get('description')?.value);
  //   formData.append('lieu', this.salle.get('lieu')?.value);
  //   formData.append('prix', this.salle.get('prix')?.value);
  //      formData.append('typeSalle', this.salle.get('typeSalle')?.value);
  //   if (this.selectedFile) {
  //     formData.append('image', this.selectedFile, this.selectedFile.name);
  //   }

  //   if (this.id != undefined){
  //      this.SCGS.updateSalle(this.id, this.salle.value).subscribe({
  //         next: () => this.router.navigate(['/listSalle']),
  //         error: (e) => {
  //           Swal.fire({
  //             icon: 'error',
  //             title: 'Erreur',
  //             text: e.message
  //           });
  //         }
  //       });
  //       }else {

  //         this.SCGS.addSalle(formData).subscribe({
  //         next:() => this.router.navigate(['/listSalle']),
  //         error: (e) => {
  //           Swal.fire({
  //             icon: 'error',
  //             title: 'Erreur',
  //             text: e.message
  //           });
  //         }
  //       });
  //     }
  //   }
  add() {
    if (this.salle.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: 'Veuillez remplir tous les champs requis.'
      });
      return;
    }
    const formData: FormData = new FormData();
    formData.append('nomSalle', this.salle.get('nomSalle')?.value);
    formData.append('description', this.salle.get('description')?.value);
    formData.append('lieu', this.salle.get('lieu')?.value);
    formData.append('prix', this.salle.get('prix')?.value);
    formData.append('typeSalle', this.salle.get('typeSalle')?.value);
    if (this.selectedFile) {
      formData.append('image', this.selectedFile, this.selectedFile.name);
    }

    if (this.id != undefined) {
      this.SCGS.updateSalle(this.id, this.salle.value).subscribe({
        next: () => {
          Swal.fire({
            icon: 'success',
            title: 'Succès',
            text: 'La salle a été mise à jour avec succès.'
          });
          this.router.navigate(['/listSalle']);
        },
        error: (e) => {
          Swal.fire({
            icon: 'error',
            title: 'Erreur',
            text: e.message
          });
        }
      });
    } else {
      this.SCGS.addSalle(formData).subscribe({
        next: () => {
          Swal.fire({
            icon: 'success',
            title: 'Succès',
            text: 'La salle a été ajoutée avec succès.'
          });
          this.router.navigate(['/listSalle']);
        },
        error: (e) => {
          Swal.fire({
            icon: 'error',
            title: 'Erreur',
            text: e.message
          });
        }
      });
    }
  }

  }
