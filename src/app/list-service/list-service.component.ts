import { Component, OnInit } from '@angular/core';
import { Service } from '../core/models/service';
import { ServiceService } from '../core/services/service.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-list-service',
  templateUrl: './list-service.component.html',
  styleUrls: ['./list-service.component.css']
})
export class ListServiceComponent implements OnInit{
  listServices:Service[] = [];
  searchText : string ="";
  
  constructor(private ss:ServiceService){
    // this.getAllServices()
  }
  
  ngOnInit() {
    this.getAllServices()
  }
  

  service: FormGroup = new FormGroup({
    libelle: new FormControl(""),
  });

  getAllServices(){
    this.ss.getServices().subscribe({
      next:(serv)=>{
        console.log(serv);
        this.listServices = serv;
      },
      error:(er)=>alert(er.message)
    })
  }
  addService(){
    this.ss.addService(this.service.value).subscribe({
      next:()=>{
          alert("service Added successfully !")
          this.ss.getServices().subscribe({
            next:(serv)=>{
              console.log(serv);
              this.listServices = serv;
            },
            error:(er)=>alert(er.message)
          })
      },
      error: (e)=>alert(e.message)
    })
  }
  removeService(id:string){
    this.ss.deleteService(id).subscribe({
      next:()=>{
        alert("Delete success ! ");
        this.listServices = this.listServices.filter(r=>r._id != id); 
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

  


}
