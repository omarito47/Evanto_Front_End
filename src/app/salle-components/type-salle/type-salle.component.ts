import { Component, OnInit } from '@angular/core';
import { TypeSalle } from 'src/app/core/models/typeSalle';
import { ConsumerGSService } from 'src/app/core/services/consumer-gs.service';
import { FormControl, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-type-salle',
  templateUrl: './type-salle.component.html',
  styleUrls: ['./type-salle.component.css']
})
export class TypeSalleComponent implements OnInit  {
  ListTypeSalles:TypeSalle[] = [];
  
  
  constructor(private SCGS: ConsumerGSService) {}
  
  ngOnInit() {
    this.getAllTypeSalle()
  }
  

  typeSalle: FormGroup = new FormGroup({
    libelle: new FormControl(""),
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
    this.SCGS.addTypeSalle(this.typeSalle.value).subscribe({
      next:()=>{
          alert("salleType Added successfully !")
          this.SCGS.getTypeSalles().subscribe({
            next:(LS)=>{
              console.log(LS);
              this.ListTypeSalles = LS;
            },
            error:(er)=>alert(er.message)
          })
      },
      error: (e)=>alert(e.message)
    })
  }
  deleteTypeSalle(id:string){
    this.SCGS.deleteTypeSalle(id).subscribe({
      next:()=>{
        alert("Delete success ! ");
        this.ListTypeSalles = this.ListTypeSalles.filter(r=>r._id != id); 
      },
      error:(e)=>alert(e.message),
    })
  }

  updateTypeSalle(typeSalle: TypeSalle) {
    const updatedTypeSalle: TypeSalle = { _id: typeSalle._id, libelle: typeSalle.libelle, isEditing: false };
    
    this.SCGS.updateTypeSalle(typeSalle._id, updatedTypeSalle).subscribe({
      next: () => {
        alert("Type salle updated successfully!");
        this.getAllTypeSalle();
      },
      error: (e) => {
        if (e.status === 404) {
          alert("Type salle not found. Check the ID and try again.");
        } else {
          alert("Error updating type salle: " + e.message);
        }
      },
    });
  }
  
  
  
  

}
