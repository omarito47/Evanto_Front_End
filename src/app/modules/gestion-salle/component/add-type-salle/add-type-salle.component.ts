import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TypeSalle } from 'src/app/core/model/typeSalle';
import { ConsumerGSService } from 'src/app/core/services/consumer-gs.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-type-salle',
  templateUrl: './add-type-salle.component.html',
  styleUrls: ['./add-type-salle.component.scss']
})
export class AddTypeSalleComponent implements OnInit {

  ListTypeSalles:TypeSalle[] = [];
  
  
  constructor(private SCGS: ConsumerGSService) {}
  
  ngOnInit() {
    this.getAllTypeSalle()
  }
  

  typeSalle: FormGroup = new FormGroup({
    libelle: new FormControl("", [Validators.required,Validators.pattern('[A-Z]+[a-zA-z0-9]*') ]),
  });

  getAllTypeSalle(){
    this.SCGS.getTypeSalles().subscribe({
      next:(LS)=>{
        console.log(LS);
        this. ListTypeSalles = LS;
      },
      error:(er)=>alert(er.message)
    })
  }
  addTypeSalle(){
    if (this.typeSalle.get('libelle').value.trim() === '') { // Vérifier si le champ libelle est vide
      Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: 'Veuillez remplir le champ "Type de salle".'
      });
      return;
    }
    this.SCGS.addTypeSalle(this.typeSalle.value).subscribe({
      next: () => {
      Swal.fire({
        icon: 'success',
        title: 'Succès',
        text: 'Type de salle ajouté avec succès.'
      });
          this.SCGS.getTypeSalles().subscribe({
            next:(LS)=>{
              console.log(LS);
              this.ListTypeSalles = LS;
            },
            error: (er) => {
              Swal.fire({
                icon: 'error',
                title: 'Erreur',
                text: er.message
              });
            }
          });
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
  deleteTypeSalle(id:string){
    this.SCGS.deleteTypeSalle(id).subscribe({
      next:()=>{
        Swal.fire({
          icon: 'success',
          title: 'Succès',
          text: 'Type de salle supprimé avec succès.'
        });
        this.ListTypeSalles = this.ListTypeSalles.filter(r=>r._id != id); 
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

  updateTypeSalle(typeSalle: TypeSalle) {
    const updatedTypeSalle: TypeSalle = { _id: typeSalle._id, libelle: typeSalle.libelle, isEditing: false };
    
    this.SCGS.updateTypeSalle(typeSalle._id, updatedTypeSalle).subscribe({
      next: () => {
        Swal.fire({
            icon: 'success',
            title: 'Succès',
            text: 'Type de salle mis à jour avec succès.'
        });
        this.getAllTypeSalle();
      },
      error: (e) => {
        if (e.status === 404) {
            Swal.fire({
                icon: 'error',
                title: 'Erreur',
                text: 'Type de salle non trouvé. Vérifiez l\'ID et réessayez.'
            });
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Erreur',
                text: 'Erreur lors de la mise à jour du type de salle: ' + e.message
            });
        }
    }
});
}
  

}
