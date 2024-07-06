// src/app/models/participation.model.ts


import { User } from 'src/app/core/model/user'; // Assurez-vous d'importer correctement le modèle User si nécessaire



export interface Participation {
  _id: string;
  client_id: User; // Assurez-vous que User est un modèle avec une structure similaire à celle attendue
  atelier_id: Atelier; // Assurez-vous que Atelier est un modèle avec une structure similaire à celle attendue
  etat: 'en attente' | 'confirmée' | 'annulée';
  createdAt: Date;
  updatedAt: Date;
}
export interface Atelier {
  _id: string;
  nom: string;
  // Autres propriétés nécessaires pour l'atelier
}