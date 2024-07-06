// quiz.model.ts

export interface Quiz {
    _id?: string; // Identifiant MongoDB, optionnel pour la création
    question: string;
    options: string[];
    correctAnswer: string;
    atelier: string; // Référence à l'identifiant de l'atelier associé
  }
  