// evaluation.model.ts

export interface Evaluation {
  _id?: string;         // Identifiant de l'évaluation (facultatif si généré côté backend)
  userId: string;       // Identifiant de l'utilisateur ayant fait l'évaluation
  atelierId: string;    // Identifiant de l'atelier associé à l'évaluation
  rating: number;       // Note de l'évaluation
  comment: string;      // Commentaire de l'évaluation
  atelier: {
    _id: string;        // Identifiant de l'atelier
    nom: string;        // Nom de l'atelier
  };
  showCommentForm?: boolean; // Propriété pour afficher/masquer le formulaire de commentaire
  newComment?: string;       // Contenu du nouveau commentaire à ajouter (optionnel)
  comments?: Comment[];      // Liste des commentaires associés à cette évaluation
  likes: string[];           // Liste des identifiants d'utilisateurs ayant liké cette évaluation
  emoji?: string;            // Propriété pour stocker l'emoji associé à l'évaluation
  cancelled: boolean;
  confirmed: boolean;
  
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Comment {
  _id?: string;   
  evaluationId: string; // Identifiant de l'évaluation à laquelle le commentaire est associé        // Identifiant du commentaire (facultatif si généré côté backend)
  userId: string;         // Identifiant de l'utilisateur ayant fait le commentaire
  userName?: string;      // Nom de l'utilisateur (facultatif, peut être ajouté si nécessaire)
  createdAt?: Date;       // Date de création du commentaire
  updatedAt?: Date;       // Date de dernière mise à jour du commentaire
  comment?: string;       // Contenu du commentaire (optionnel)
  likes?: string[];       // Liste des identifiants d'utilisateurs ayant aimé ce commentaire
  replies?: CommentReply[]; // Liste des réponses à ce commentaire
  // Autres propriétés spécifiques au commentaire, si nécessaires
  showReplyForm?: boolean; // Assurez-vous que showReplyForm est défini dans l'interface Comment
  newReply?: string; // Définir newReply comme optionnel dans l'interface Comment
}

export interface CommentReply {
  _id?: string;           // Identifiant de la réponse (facultatif si généré côté backend)
  userId: string;         // Identifiant de l'utilisateur ayant fait la réponse
  userName?: string;      // Nom de l'utilisateur (facultatif, peut être ajouté si nécessaire)
  createdAt?: Date;       // Date de création de la réponse
  updatedAt?: Date;       // Date de dernière mise à jour de la réponse
  reply: string;          // Contenu de la réponse
}

export interface Reply {
  userId: string;         // Identifiant de l'utilisateur ayant fait la réponse
  reply: string;          // Contenu de la réponse
}
