// participation.model.ts

export interface Participation {
  _id: string;
  user: {
    _id: string;
    name: string; // Nom de l'utilisateur
  };
  atelier: {
    _id: string;
    nom: string; // Nom de l'atelier
  };
  categorie: {
    _id: string;
    nom_categorie: string; // Nom de la catégorie
  };
  status: 'en attente' | 'confirmée' | 'annulée';
  createdAt: Date;
  updatedAt: Date;
}
