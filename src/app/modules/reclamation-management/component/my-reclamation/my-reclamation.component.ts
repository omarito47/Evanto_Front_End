import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Reclamation } from '../../../../core/model/reclamation';
import { Service } from '../../../../core/model/service';
import { ReclamationService } from '../../../../core/services/reclamation.service';
import { ServiceService } from '../../../../core/services/service.service';

@Component({
  selector: 'app-my-reclamation',
  templateUrl: './my-reclamation.component.html',
  styleUrls: ['./my-reclamation.component.scss']
})
export class MyReclamationComponent implements OnInit {

  listReclamations:Reclamation[] = [];
  listReclamationsSearched:Reclamation[] = [];
  listService:Service[] = [];
  searchText : string ="";
  etatRchercher:string ="";
  sortOrder: string = "desc";
  serviceidSearch:string="all";
  // idUser:string = "66510cf1d2437c2280e41b0e"


  constructor(private sr:ReclamationService,
    private ss:ServiceService,
    private cdr: ChangeDetectorRef,
 
  ){}



  ngOnInit() {
    this.getAllReclamations();
    this.getAllServices();
    console.log(this.etatRchercher);
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
        this.listReclamationsSearched = this.listReclamations;
        
      },
      error:(er)=>alert(er.message)
    })
  }
  // getAllReclamations(){
  //   this.sr.getReclamationByUser(this.idUser).subscribe({
  //     next:(rec)=>{
  //       console.log(rec);
  //       this.listReclamations = rec;
  //       this.listReclamationsSearched = rec;
        
  //     },
  //     error:(er)=>this.listReclamations = []
  //   })
  // }
  removeReclamation(id:string){
    this.sr.deleteReclamation(id).subscribe({
      next:()=>{
        alert("Delete success ! ");
        this.listReclamationsSearched = this.listReclamationsSearched.filter(r=>r._id != id); 

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
          this.sortReclamationsByDate();
        }, error => {
          console.error('Error searching reclamtion', error);
        });
    } else {
      this.getAllReclamations(); // Show all services if search key is less than 3 characters
    }
  }

  
  onSortOrderChange(event: any) {
    this.sortOrder = event.target.value;
    this.sortReclamationsByDate();
  }
  sortReclamationsByDate() {
    this.listReclamationsSearched.sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      if (this.sortOrder === "asc") {
        return dateA - dateB; // Oldest first
      } else {
        return dateB - dateA; // Newest first
      }
    });
  }



}
