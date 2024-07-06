import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Categorie } from 'src/app/core/model/categorie';
import { CategorieService } from 'src/app/core/services/categorie.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-add-categorie',
  templateUrl: './add-categorie.component.html',
})
export class AddCategorieComponent implements OnInit {
  listServices: Categorie[] = [];
  archivedCategories: Categorie[] = [];
  p: number = 1;
  searchText = "";
  editingCategoryId: string | null = null;

  constructor(private router: Router, private categorieService: CategorieService) { }

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.categorieService.fetchAll().subscribe({
      next: (categories: Categorie[]) => {
        this.listServices = categories.filter(categorie => !categorie.archived);
        this.archivedCategories = categories.filter(categorie => categorie.archived);
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

  startEditing(categoryId: string) {
    this.editingCategoryId = categoryId;
  }

  cancelEditing() {
    this.editingCategoryId = null;
  }

  saveChanges(category: Categorie) {
    this.categorieService.update(category._id, category).subscribe({
      next: (updatedCategory: Categorie) => {
        alert('Mise à jour réussie !');
        this.editingCategoryId = null;
        this.getAll();
      },
      error: (error) => {
        console.error('Erreur lors de la mise à jour de la catégorie:', error);
        alert('Erreur lors de la mise à jour de la catégorie. Veuillez réessayer.');
      }
    });
  }

  archive(id: string) {
    if (confirm("Êtes-vous sûr de vouloir archiver cette catégorie ?")) {
      const categoryToArchive = this.listServices.find(categorie => categorie._id === id);
      if (!categoryToArchive) {
        console.error('Catégorie à archiver introuvable.');
        return;
      }

      this.categorieService.archiveCategory(id).subscribe({
        next: (archivedCategory: Categorie) => {
          alert('Catégorie archivée avec succès !');
          this.listServices = this.listServices.filter(categorie => categorie._id !== id);
          this.archivedCategories.push(archivedCategory);
        },
        error: (error: HttpErrorResponse) => {
          console.error('Erreur lors de l\'archivage de la catégorie:', error);
          alert('Erreur lors de l\'archivage de la catégorie. Veuillez réessayer.');
        }
      });
    }
  }

  restoreByName(categoryName: string) {
    if (!categoryName) {
      console.error('Nom de catégorie invalide pour la restauration.');
      return;
    }

    const archivedCategory = this.archivedCategories.find(categorie => categorie.nom_categorie === categoryName);
    if (!archivedCategory) {
      console.error('Catégorie archivée introuvable.');
      return;
    }

    this.categorieService.restoreCategory(archivedCategory._id).subscribe({
      next: (restoredCategory: Categorie) => {
        console.log('Catégorie restaurée avec succès !', restoredCategory);
        this.archivedCategories = this.archivedCategories.filter(categorie => categorie._id !== restoredCategory._id);
        this.listServices.push(restoredCategory);
      },
      error: (error: HttpErrorResponse) => {
        console.error('Erreur lors de la restauration de la catégorie:', error);
        alert(`Erreur lors de la restauration de la catégorie: ${error.message}`);
      }
    });
  }

  search() {
    if (this.searchText.trim()) {
      this.categorieService.search(this.searchText).subscribe({
        next: (categories: Categorie[]) => {
          this.listServices = categories.filter(categorie => !categorie.archived);
          this.archivedCategories = categories.filter(categorie => categorie.archived);
        },
        error: (error) => {
          console.error('Erreur lors de la recherche des catégories:', error);
          alert('Erreur lors de la recherche des catégories. Veuillez réessayer.');
        }
      });
    } else {
      this.getAll();
    }
  }
}
