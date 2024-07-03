// src/app/model/evaluation.ts

export interface Comment {
    userId: string;
    comment: string;
  }
  
  export interface Evaluation {
    userId: string;
    atelierId: string;
    rating: number;
    comment: string;
    comments: Comment[];
    likes: string[];
  }
  