export class Commentaire{
    _id!:string;
    description!:string;
    reclamationComment!:string;
    usercomment!:string;
    selection:boolean=false;
    createdAt:Date = new Date();
    updatedAt!:Date ;
    


    constructor(data?: { description: string, reclamationComment: string, usercomment: string }) {
        this.description = data?.description || '';
        this.reclamationComment = data?.reclamationComment || '';
        this.usercomment = data?.usercomment || '';
      }
}

