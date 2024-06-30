import { Component, OnInit } from '@angular/core';
import { Service } from '../../../../core/model/service';
import { ServiceService } from '../../../../core/services/service.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-list-service',
  templateUrl: './list-service.component.html',
  styleUrls: ['./list-service.component.css']
})
export class ListServiceComponent implements OnInit{
  // listServices:Service[] = [];
  // searchText : string ="";
  
  listServices:Service[] = [];
  searchTextService : string ="";
  editIndex: number | null = null;
  constructor(private ss:ServiceService,
    private fb: FormBuilder
  ){}
  
  ngOnInit() {
    this.getAllServices()
  }
 /**************************service************* */
 serviceForm: FormGroup = new FormGroup({
  libelle: new FormControl(""),
});

 getAllServices(){
  this.ss.getServices().subscribe({
    next:(ser)=>{
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



}



/********************************************* */

