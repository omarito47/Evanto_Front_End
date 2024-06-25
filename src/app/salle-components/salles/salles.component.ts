import { Component, OnInit } from '@angular/core';
import { ConsumerGSService } from 'src/app/core/services/consumer-gs.service';
import { Salle } from 'src/app/core/models/salle';;
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TypeSalle } from 'src/app/core/models/typeSalle';


@Component({
  selector: 'app-salles',
  templateUrl: './salles.component.html',
  styleUrls: ['./salles.component.css']
})
export class SallesComponent implements OnInit {
  listSalles: Salle[] = [];
  listTypeSalles: TypeSalle[] = [];
  searchText : string ="";
  listSalleSearched:Salle[] = [];

  salle: FormGroup = new FormGroup({
    nomSalle: new FormControl(''),
    description: new FormControl(''),
    lieu: new FormControl(''),
    prix: new FormControl(0, [
      Validators.required,
      Validators.pattern('[0-9]+')
    ]),
    image: new FormControl(''),
    typeSalle: new FormControl(''),
  });

  constructor(
    private SCGS: ConsumerGSService
  ) {}

  

  getAllSalles() {
    this.SCGS.getSalles().subscribe({
      next: (sal) => {
        this.listSalles = sal;
        this.listSalleSearched = sal; 
      },
      error: (er) => {
        alert(er.message);
      }
    });
  }

  ngOnInit() {
    this.getAllSalles();
    this.getAllTypeSallesWithLibelle();  // Nouvelle méthode pour obtenir les types de salles avec libellé
  }

 
//pr afficher type salle par libelle
  getAllTypeSallesWithLibelle() {
    this.SCGS.getTypeSallesWithLibelle().subscribe({
      next: (types) => {
        this.listTypeSalles = types;
      },
      error: (er) => {
        alert(er.message);
      }
    });
  }

  getTypeSalleLibelleById(id: string): string {
    const typeSalle = this.listTypeSalles.find(type => type._id === id);
    return typeSalle ? typeSalle.libelle : 'Non défini';
  }

  delete(id: string) {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette salle ?')) {
      this.SCGS.deleteSalle(id).subscribe({
        next: () =>
          (this.listSalles = this.listSalles.filter(
            (salle) => salle._id !== id
          )),
        error: (error) => {
          console.error('Error deleting category:', error);
        },
      });
    }
  }
 
  searchSalle(event: any) {
    const key = event.target.value;
    if (event.target.value.length >= 1) { // Start search after 3 characters
      this.SCGS.chercherSalle(key)
      .subscribe((rec) => {
          this.listSalleSearched = rec;
        }, error => {
          console.error('Error searching salle', error);
        });
    } else {
      this.listSalleSearched = this.listSalles; // Show all services if search key is less than 3 characters
    }
  }
  
}