import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Reclamation } from '../core/models/reclamation';
import { ReclamationService } from '../core/services/reclamation.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Service } from '../core/models/service';
import { ServiceService } from '../core/services/service.service';

@Component({
  selector: 'app-reclamation-form',
  templateUrl: './reclamation-form.component.html',
  styleUrls: ['./reclamation-form.component.css']
})
export class ReclamationFormComponent {
 
  idr!:string;
  rec!:Reclamation ;
  listServices:Service[] = [];
  selectedFile: File | null = null;
  constructor(private rs:ReclamationService,
    private ss:ServiceService,
    private router:Router,
    private ar:ActivatedRoute ,
  ){
    this.idr = this.ar.snapshot.params['id'];

    this.ss.getServices().subscribe({
      next:(sers)=>{
        console.log(sers);
        this.listServices = sers;
      },
      error:(er)=>alert(er.message)
    })

    if (this.idr != undefined) {
      this.rs.getReclamationById(this.idr).subscribe({
        next: (data) => {
          this.reclamation.patchValue({
            title: data.title,
            description: data.description,
            email: data.email,
            numTelReclamation: data.numTelReclamation,
            pieceJointe: data.pieceJointe.name,
            typeReclamation: data.typeReclamation,
          });
          this.rec = data;
        },
      });
    } 

  }
  ngOnInit(): void {}
  onFileChange(event: any) {
    this.selectedFile = event.target.files[0];
  }



  
  reclamation: FormGroup = new FormGroup({
    title: new FormControl(""),
    description: new FormControl(""),
    email: new FormControl(""),
    numTelReclamation: new FormControl(),
    pieceJointe: new FormControl(this.selectedFile),
    typeReclamation: new FormControl(""),
    userReclamation: new FormControl('66510cf1d2437c2280e41b0e'),
  });


  add() {
    const formData: FormData = new FormData();
    formData.append('title', this.reclamation.get('title')?.value);
    formData.append('description', this.reclamation.get('description')?.value);
    formData.append('email', this.reclamation.get('email')?.value);
    formData.append('numTelReclamation', this.reclamation.get('numTelReclamation')?.value);
    formData.append('typeReclamation', this.reclamation.get('typeReclamation')?.value);
    formData.append('userReclamation', this.reclamation.get('userReclamation')?.value);
    if (this.selectedFile) {
      formData.append('pieceJointe', this.selectedFile, this.selectedFile.name);
    }
    
    if (this.idr != undefined) {
      this.rs.updateReclamation(this.idr,this.reclamation.value).subscribe({
        next: () => this.router.navigate(['/']),
        error: (err) => alert(err.message),
        })
    }else{
    
      
      this.rs.addReclamation(formData).subscribe({
        next: () => this.router.navigate(['/']),
        error: (e) => alert(e.message),
      });
    }
   
  }

}
 














 


  

