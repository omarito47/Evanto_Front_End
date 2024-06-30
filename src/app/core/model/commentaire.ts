export class Commentaire{
    _id!:string;
    description!:string;
    reclamationComment!:string;
    roleUser:string;
    usercomment!:string;
    selection:boolean=false;
    createdAt:Date = new Date();
    updatedAt!:Date ;
    
    


    constructor(data?: { description: string, reclamationComment: string, roleUser: string , usercomment: string }) {
        this.description = data?.description || '';
        this.reclamationComment = data?.reclamationComment || '';
        this.roleUser = data?.roleUser || '';
        this.usercomment = data?.usercomment || '';
      }
}

