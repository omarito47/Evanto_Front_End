export class Reclamation{
    _id!:string;
    title!:string;
    description!:string;
    status:boolean = true;
    etat:boolean=false;
    email!:string;
    numTelReclamation!:number;
    pieceJointe!:File ;
    typeReclamation!:string;
    userReclamation!:string;
    createdAt:Date = new Date();
    updatedAt!:Date ;
}