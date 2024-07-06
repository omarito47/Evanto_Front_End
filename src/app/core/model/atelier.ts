export class Atelier {
  _id!: string;
  nom!: string;
  description!: string;
  lieu!: Lieu; // Assurez-vous que `lieu` est correctement défini dans votre modèle
  date_debut!: Date;
  date_fin!: Date;
  Nbr_place!: number;
  frequence_de_repetition!: FrequenceRepetition;
  typeAtelier!: string;
  prix!: number;
  frais_de_participation!: FraisDeParticipation;
   image!: string;
  latitude!: number; // Ajout de latitude
  longitude!: number; // Ajout de longitude
}

export interface Lieu {
  lat: number;
  lng: number;
}


// Enumérations pour la fréquence de répétition et les frais de participation
// ... (comme défini précédemment)


// Énumération pour la fréquence de répétition
export enum FrequenceRepetition {
  UneSeuleFois = 'Une seule fois',
  Quotidien = 'Quotidien',
  Hebdomadaire = 'Hebdomadaire',
  Bihebdomadaire = 'Bihebdomadaire',
}

// Énumération pour les frais de participation
export enum FraisDeParticipation {
  Payant = 'payant',
  Gratuit = 'gratuit',
}
