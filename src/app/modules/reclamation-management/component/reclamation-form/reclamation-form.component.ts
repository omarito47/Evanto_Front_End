import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Reclamation } from '../../../../core/model/reclamation';
import { Service } from '../../../../core/model/service';
import { ReclamationService } from '../../../../core/services/reclamation.service';
import { ServiceService } from '../../../../core/services/service.service';

@Component({
  selector: 'app-reclamation-form',
  templateUrl: './reclamation-form.component.html',
  styleUrls: ['./reclamation-form.component.scss']
})
export class ReclamationFormComponent implements OnInit {

  idr!:string;
  rec!:Reclamation ;
  listServices:Service[] = [];
  selectedFile: File | null = null;
  current_id_user:string = localStorage.getItem("userId");

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
    title: new FormControl("",[Validators.required, Validators.maxLength(50)]),
    description: new FormControl("",[Validators.required, Validators.maxLength(300)]),
    email: new FormControl("",[Validators.required, Validators.email]),
    numTelReclamation: new FormControl([Validators.required, Validators.pattern(/^\d{8}$/)]),
    pieceJointe: new FormControl(this.selectedFile),
    typeReclamation: new FormControl("",[Validators.required]),
    userReclamation: new FormControl(this.current_id_user),
  });


  add() {

    if (this.reclamation.invalid) {
      this.reclamation.markAllAsTouched();
      return;
    }
    console.log(this.current_id_user);
    
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
    console.log(formData);
    
    
    if (this.idr != undefined) {
      this.rs.updateReclamation(this.idr,this.reclamation.value).subscribe({
        next: () => {
          this.router.navigate(['/nav2/mes-reclamations'])

        },
        error: (err) => alert(err.message),
        })
    }else{
    
      
      this.rs.addReclamation(formData).subscribe({
        next: () => {
          this.router.navigate(['/nav2/mes-reclamations'])
          
        },
        error: (e) => alert(e.message),
      });
    }
   
  }

}
