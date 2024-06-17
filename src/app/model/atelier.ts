export class Atelier {
    _id!: string;
    nom!: string;
    description!: string;
    lieu!: string;
    date_debut!: Date;
    date_fin!: Date;
    Nbr_place!: number;
    frequence_de_repetition!: FrequenceRepetition; // Utilisation de l'énumération FrequenceRepetition
    typeAtelier!: string; // Supposant que 'typeAtelier' est représenté par son ID en tant que chaîne
    prix!: number;
    frais_de_participation!: FraisDeParticipation; // Ajout du nouvel attribut avec énumération
}

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
