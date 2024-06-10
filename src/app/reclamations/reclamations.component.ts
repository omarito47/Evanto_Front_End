import { Component, OnInit } from '@angular/core';
import { ReclamationService } from '../core/services/reclamation.service';
import { Reclamation } from '../core/models/reclamation';
import { ServiceService } from '../core/services/service.service';
import { Service } from '../core/models/service';

@Component({
  selector: 'app-reclamations',
  templateUrl:'./reclamations.component.html',
  styleUrls: ['./reclamations.component.css']
})
export class ReclamationsComponent implements OnInit{
  listReclamations:Reclamation[] = [];
  listReclamationsSearched:Reclamation[] = [];
  listService:Service[] = [];
  searchText : string ="";
  etatRchercher:string ="";
  // statusRecouv :boolean = false;
  // statusRecferm :boolean = false;
  serviceidSearch:string="all"
  constructor(private sr:ReclamationService,
    private ss:ServiceService,
  ){}



  ngOnInit() {
    this.getAllReclamations();
    this.getAllServices();
    console.log(this.etatRchercher);
    // this.getRecOuvert()
    // this.getRecFermer ()
  }


  
  filterRecByService(event:any){
    this.listReclamationsSearched = this.listReclamations;
    if(this.serviceidSearch == "all"){
      this.listReclamationsSearched = this.listReclamations;
    }else{
      console.log(this.serviceidSearch);
      this.listReclamationsSearched = this.listReclamationsSearched.filter(rec => rec.typeReclamation === this.serviceidSearch);
    }
  }
  getAllServices(){
    this.ss.getServices().subscribe({
      next:(ser)=>{
        console.log(ser);
        this.listService = ser;
      },
      error:(er)=>alert(er.message)
    })
  }
  getAllReclamations(){
    this.sr.getReclamations().subscribe({
      next:(rec)=>{
        console.log(rec);
        this.listReclamations = rec;
        this.listReclamationsSearched = rec;
        
      },
      error:(er)=>alert(er.message)
    })
  }
  removeReclamation(id:string){
    this.sr.deleteReclamation(id).subscribe({
      next:()=>{
        alert("Delete success ! ");
        this.listReclamations = this.listReclamations.filter(r=>r._id != id); 
      },
      error:(e)=>alert(e.message),
    })
  }
  searchReclamation(event: any) {
    const key = event.target.value;
    if (event.target.value.length >= 2) { // Start search after 3 characters
      this.sr.chercherReclamation(key)
      .subscribe((rec) => {
          this.listReclamationsSearched = rec;
        }, error => {
          console.error('Error searching reclamtion', error);
        });
    } else {
      this.getAllReclamations(); // Show all services if search key is less than 3 characters
    }
  }
  // getRecOuvert(){
  //   this.listReclamations = this.listReclamations.filter( rec => {
  //     return rec.status == true
  //   })
  //   if(this.statusRecouv == false){
  //     this.getAllReclamations()
  //   }
  // }
  // getRecFermer(){
  //   this.listReclamations = this.listReclamations.filter(rec =>rec.status == false)
  //   if(this.statusRecferm == false){
  //     this.getAllReclamations()
  //   }
  // }
  






}
