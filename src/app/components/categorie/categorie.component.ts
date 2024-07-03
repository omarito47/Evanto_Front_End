// categorie.component.ts

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Categorie } from 'src/app/model/categorie';
import { CategorieService } from 'src/app/services/categorie.service';

@Component({
  selector: 'app-categorie',
  templateUrl: './categorie.component.html',
  //styleUrls: ['./categorie.component.css']
})
export class CategorieComponent implements OnInit {
  listServices: Categorie[] = [];
  p: number = 1;
  searchText = "";
  editingCategoryId: string | null = null; // ID de la catégorie en cours d'édition

  constructor(private router: Router, private categorieService: CategorieService) { }

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.categorieService.fetchAll().subscribe({
      next: (categories: Categorie[]) => {
        this.listServices = categories;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des catégories:', error);
        alert('Erreur lors du chargement des catégories. Veuillez réessayer.');
      }
    });
  }

  delete(id: string) {
    if (confirm("Êtes-vous sûr de vouloir supprimer cette catégorie ?")) {
      this.categorieService.delete(id).subscribe({
        next: () => {
          alert("Suppression réussie !");
          this.listServices = this.listServices.filter(categorie => categorie._id !== id);
        },
        error: (error) => {
          console.error('Erreur lors de la suppression de la catégorie:', error);
          alert('Erreur lors de la suppression de la catégorie. Veuillez réessayer.');
        }
      });
    }
  }

  // Fonction pour démarrer l'édition d'une catégorie
  startEditing(categoryId: string) {
    this.editingCategoryId = categoryId;
  }

  // Fonction pour annuler l'édition d'une catégorie
  cancelEditing() {
    this.editingCategoryId = null;
  }

  // Fonction pour mettre à jour une catégorie
  update(category: Categorie) {
    this.categorieService.update(category._id, category).subscribe({
      next: (updatedCategory: Categorie) => {
        alert('Mise à jour réussie !');
        this.editingCategoryId = null;
        // Optionnel : Rafraîchir la liste des catégories après mise à jour
        this.getAll();
      },
      error: (error) => {
        console.error('Erreur lors de la mise à jour de la catégorie:', error);
        alert('Erreur lors de la mise à jour de la catégorie. Veuillez réessayer.');
      }
    });
  }

  // Ajout de la fonction de recherche
  search() {
    if (this.searchText.trim()) {
      this.categorieService.search(this.searchText).subscribe({
        next: (categories: Categorie[]) => {
          this.listServices = categories;
        },
        error: (error) => {
          console.error('Erreur lors de la recherche des catégories:', error);
          alert('Erreur lors de la recherche des catégories. Veuillez réessayer.');
        }
      });
    } else {
      this.getAll(); // Réinitialiser à toutes les catégories si la requête de recherche est vide
    }
  }

  // Fonction pour archiver une catégorie
  archive(id: string) {
    if (confirm("Êtes-vous sûr de vouloir archiver cette catégorie ?")) {
      this.categorieService.archiveCategory(id).subscribe({
        next: (archivedCategory: Categorie) => {
          alert('Catégorie archivée avec succès !');
          setTimeout(() => {
            this.getAll(); // Rafraîchir la liste après archivage
          }, 100); // Attendre 100 millisecondes avant de rafraîchir
        },
        error: (error) => {
          console.error('Erreur lors de l\'archivage de la catégorie:', error);
          alert('Erreur lors de l\'archivage de la catégorie. Veuillez réessayer.');
        }
      });
    }
  }
  
  

restore(id: string) {
  this.categorieService.restoreCategory(id).subscribe({
    next: (restoredCategory: Categorie) => {
      console.log('Catégorie restaurée avec succès !', restoredCategory);
      // Rafraîchir la liste des catégories ou effectuer d'autres actions nécessaires
    },
    error: (error) => {
      console.error('Erreur lors de la restauration de la catégorie:', error);
      // Gestion des erreurs
    }
  });
}


}
