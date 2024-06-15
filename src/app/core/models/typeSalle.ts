export class TypeSalle {
    _id!: string;
    libelle!: string;
    isEditing: boolean = false; // Propriété pour gérer l'édition du libellé
  
    constructor(_id: string, libelle: string) {
     
    }
  }
  