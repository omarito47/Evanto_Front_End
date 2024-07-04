import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Salle } from 'src/app/core/model/salle';
import { TypeSalle } from 'src/app/core/model/typeSalle';
import { ConsumerGSService } from 'src/app/core/services/consumer-gs.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-salle',
  templateUrl: './salle.component.html',
  styleUrls: ['./salle.component.scss']
})
export class SalleComponent implements OnInit {
  listSalles: Salle[] = [];
  listTypeSalles: TypeSalle[] = [];
  

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
    Swal.fire({
      title: 'Êtes-vous sûr de vouloir supprimer cette salle ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        this.SCGS.deleteSalle(id).subscribe({
          next: () => {
            this.listSalles = this.listSalles.filter(salle => salle._id !== id);
            Swal.fire('Supprimé !', 'La salle a été supprimée avec succès.', 'success');
          },
          error: (error) => {
            console.error('Error deleting salle:', error);
            Swal.fire('Erreur', 'Une erreur est survenue lors de la suppression de la salle.', 'error');
          }
        });
      }
    });
  }

  searchSalle(event: any) {
    const key = event.target.value.trim().toLowerCase(); // Trim et convertir en minuscules pour une recherche insensible à la casse
    
    if (key.length >= 1) {
      this.SCGS.chercherSalle(key).subscribe(
        (rec) => {
          this.listSalles = rec; // Mettre à jour la liste des salles filtrées
        },
        (error) => {
          console.error('Error searching salle', error);
        }
      );
    } else {
      this.getAllSalles(); // Recharger toutes les salles si la recherche est vide
    }
  }
  
}