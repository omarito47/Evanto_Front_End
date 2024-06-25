import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { TypeSalle } from 'src/app/core/models/typeSalle';
import { ConsumerGSService } from 'src/app/core/services/consumer-gs.service';

@Component({
  selector: 'app-type-client-salle',
  templateUrl: './type-client-salle.component.html',
  styleUrls: ['./type-client-salle.component.css']
})
export class TypeClientSalleComponent {

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
  
 
  
}
