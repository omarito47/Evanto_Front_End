import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ReclamationService } from '../../../../core/services/reclamation.service';
import { Reclamation } from '../../../../core/model/reclamation';
import { ServiceService } from '../../../../core/services/service.service';
import { Service } from '../../../../core/model/service.js';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-gerer-reclamation',
  templateUrl: './gerer-reclamation.component.html',
  styleUrls: ['./gerer-reclamation.component.scss']
})
export class GererReclamationComponent implements OnInit {
  listReclamations:Reclamation[] = [];
  listReclamationsSearched:Reclamation[] = [];
  listService:Service[] = [];
  searchText : string ="";
  etatRchercher:string ="";
  sortOrder: string = "desc";
  serviceidSearch:string="all"
  
  serviceForm: FormGroup;
  listServices:Service[] = [];
  searchTextService : string ="";
  editIndex: number | null = null;
  constructor(private sr:ReclamationService,
    private ss:ServiceService,
    private cdr: ChangeDetectorRef,
    private fb: FormBuilder,
  ){

    this.serviceForm = this.fb.group({
      libelle: ['', Validators.required]
    });
  }

  

  ngOnInit() {
    this.getAllReclamations();
    this.getAllServices();
    console.log(this.etatRchercher);
  }

  service: FormGroup = new FormGroup({
    libelle: new FormControl(""),
  });



  
  
  /**************************service************* */
  getAllServices(){
    this.ss.getServices().subscribe({
      next:(ser)=>{
        this.listService = ser;
        this.listServices = ser;

      },
      error:(er)=>alert(er.message)
    })
  }

  removeService(id:string){
    this.ss.deleteService(id).subscribe({
      next:()=>{
        alert("Delete success ! ");
        this.listServices = this.listServices.filter(r=>r._id != id); 
        this.listService = this.listServices.filter(r=>r._id != id); 

      },
      error:(e)=>alert(e.message),
    })
  }
  searchService(event: any) {
    const key = event.target.value;
    console.log(event.target.value);
    
    if (event.target.value.length >= 2) { // Start search after 3 characters
      this.ss.chercherService(key).subscribe((services) => {
          this.listServices = services;
        }, error => {
          console.error('Error searching services', error);
        });
    } else {
      this.getAllServices(); // Show all services if search key is less than 3 characters
    }
  }


  addService() {
    this.ss.addService(this.serviceForm.value).subscribe({
      next: () => {
        alert('Service added successfully!');
        this.getAllServices();
        this.serviceForm.reset();
      },
      error: (e) => alert(e.message)
    });
  }

  editService(index: number) {
    this.editIndex = index;
  }

  updateService(index: number, service: any) {
    this.ss.updateService(service._id, service).subscribe({
      next: () => {
        alert('Service updated successfully!');
        this.getAllServices();
        this.editIndex = null;
      },
      error: (e) => alert(e.message)
    });
  }



  /********************************************* */
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
        console.log(`Deleted Reclamation ID: ${id}`);
        // this.listReclamations = this.listReclamations.filter(r=>r._id != id); 
        this.listReclamationsSearched = this.listReclamationsSearched.filter(r=>r._id != id); 

        
        this.cdr.detectChanges();

        console.log(this.listReclamations );
      },
      error:(e)=>alert(e.message),
    })
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
