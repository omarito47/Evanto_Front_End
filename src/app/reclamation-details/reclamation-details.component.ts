import { Component, OnInit } from '@angular/core';
import { Reclamation } from '../core/models/reclamation';
import { ReclamationService } from '../core/services/reclamation.service';
import { ActivatedRoute } from '@angular/router';
import { ServiceService } from '../core/services/service.service';
import { Service } from '../core/models/service';
import { FormControl, FormGroup } from '@angular/forms';
import { CommentService } from '../core/services/comment.service';
import { Commentaire } from '../core/models/commentaire';

@Component({
  selector: 'app-reclamation-details',
  templateUrl: './reclamation-details.component.html',
  styleUrls: ['./reclamation-details.component.css']
})
export class ReclamationDetailsComponent implements OnInit{
  
  id!:string;
  reclamation!:Reclamation ; 
  service!:Service ; 
  comment!:Commentaire ; 
  listComment:Commentaire[] = [];

  // listCommentaire 
  constructor(private rs:ReclamationService
    ,private ar:ActivatedRoute,
    private ss:ServiceService,
    private cs:CommentService,
    
  ){
    this.id = this.ar.snapshot.params['id'];
    // this.rs.getReclamationById(this.id).subscribe({
    //   next:(rec)=>{
    //     this.reclamation = rec;

    //     this.ss.getServiceById(rec.typeReclamation).subscribe({
    //       next:(serv)=>{
    //         this.service = serv;
    //       }
    //     })

    //     this.cs.getComments(this.reclamation.userReclamation,this.reclamation._id).subscribe({
    //       next:(comms)=>{
    //         console.log(comms);
            
    //         this.listComment = comms;
    //         console.log(this.reclamation.typeReclamation);        
    //       }
    //     })
    //   }
    // })
    
  }

  ngOnInit() {
    this.getAllList()
  }

  getAllList(){
    this.rs.getReclamationById(this.id).subscribe({
      next:(rec)=>{
        this.reclamation = rec;

        this.ss.getServiceById(rec.typeReclamation).subscribe({
          next:(serv)=>{
            this.service = serv;
          }
        })

        this.cs.getComments(this.reclamation.userReclamation,this.reclamation._id).subscribe({
          next:(comms)=>{
            console.log(comms);
            
            this.listComment = comms;
            console.log(this.reclamation.typeReclamation);        
          }
        })
      }
    })
  }

  commentaire: FormGroup = new FormGroup({
    description: new FormControl(""),
    // reclamationComment: new FormControl(this.reclamation._id),
    // usercomment : new FormControl(this.reclamation.userReclamation)
  });

  commenter(){
    const newComment = new Commentaire({
      description: this.commentaire.get('description')?.value,
      reclamationComment: this.reclamation._id,
      usercomment: this.reclamation.userReclamation
    });
    this.cs.addComment(newComment).subscribe({
      next:(coms)=> {
        alert("added success !")
        // this.listComment.push();
        this.getAllList()
      },
      error:(err)=> alert(err.message),
    })
    
  }


  traiterRec(){
    this.rs.traiterReclamation(this.reclamation._id,this.reclamation).subscribe({
      next:(rec)=>{
        alert("la reclamation est marque comme traiter !")
        this.reclamation.etat = true
      },
      error:(error)=>alert(error)
    })
  }
  ouvrireRec(){
    this.rs.ouvrireReclamation(this.reclamation._id,this.reclamation).subscribe({
      next:(rec)=>{
        alert("la reclamation est ouvert !")
        this.reclamation.status = true
        this.reclamation.etat = false
      },
      error:(error)=>alert(error)
    })
  }
  fermerRec(){
    this.rs.fermerReclamation(this.reclamation._id,this.reclamation).subscribe({
      next:(rec)=>{
        alert("la reclamation est fermer !")
        this.reclamation.status = false
        this.reclamation.etat = true
      },
      error:(error)=>alert(error)
    })
  }
  satisfait(c:Commentaire){
    this.fermerRec()
    this.traiterRec()
    this.cs.satisfaitComment(c._id,c)
    c.selection = true
  }
  nonsatisfait(c:Commentaire){
    this.ouvrireRec()
    this.cs.nonSatisfaitComment(c._id,c)
    c.selection = false
  }
  
  delete(c:Commentaire){
    this.cs.deleteComment(c._id).subscribe({
      next:()=>{
        alert("Delete success ! ");
        this.listComment = this.listComment.filter(r=>r._id != c._id); 
      },
      error:(e)=>alert(e.message),
    })
  }

}
