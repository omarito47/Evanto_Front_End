import { Component, OnInit } from '@angular/core';
import { Atelier } from 'src/app/model/atelier';
import { AtelierService } from 'src/app/services/atelier.service';
import { CategorieService } from 'src/app/services/categorie.service';
import { Categorie } from 'src/app/model/categorie';
import { Router } from '@angular/router'; // Importer Router

@Component({
  selector: 'app-ateliers',
  templateUrl: './ateliers.component.html',
  styleUrls: ['./ateliers.component.css']
})
export class AteliersComponent implements OnInit {
  listAteliers: Atelier[] = [];
  categories: Categorie[] = [];
  editingAtelier: Atelier | null = null;

  constructor(
    private atelierService: AtelierService,
    private categorieService: CategorieService,
    private router: Router // Injecter le service Router
  ) {}

  ngOnInit(): void {
    this.getAllAteliers();
    this.loadCategories();
  }

  getAllAteliers() {
    this.atelierService.fetchAll().subscribe({
      next: (ateliers: Atelier[]) => {
        console.log('Ateliers récupérés :', ateliers);
        this.listAteliers = ateliers;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des ateliers :', error);
        alert('Erreur lors du chargement des ateliers. Veuillez réessayer.');
      }
    });
  }

  loadCategories() {
    this.categorieService.getCategories().subscribe(
      (categories) => {
        this.categories = categories;
      },
      (error) => {
        console.error('Erreur lors du chargement des catégories :', error);
      }
    );
  }

  deleteAtelier(atelierId: string) {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet atelier ?')) {
      this.atelierService.deleteAtelier(atelierId).subscribe({
        next: () => {
          this.getAllAteliers();
          alert('Atelier supprimé avec succès.');
        },
        error: (error) => {
          console.error('Erreur lors de la suppression de l\'atelier :', error);
          alert('Erreur lors de la suppression de l\'atelier. Veuillez réessayer.');
        }
      });
    }
  }

  startEditing(atelier: Atelier) {
    this.editingAtelier = { ...atelier }; // Crée une copie de l'objet atelier pour l'édition
  }

  updateAtelier() {
    if (this.editingAtelier) {
      this.atelierService.updateAtelier(this.editingAtelier._id, this.editingAtelier).subscribe({
        next: () => {
          this.editingAtelier = null;
          this.getAllAteliers();
          alert('Atelier mis à jour avec succès.');
        },
        error: (error) => {
          console.error('Erreur lors de la mise à jour de l\'atelier :', error);
          alert('Erreur lors de la mise à jour de l\'atelier. Veuillez réessayer.');
        }
      });
    }
  }

  cancelEditing() {
    this.editingAtelier = null;
  }

  exportToPDF() {
    this.atelierService.exportAteliersToPDF().subscribe({
      next: (blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'ateliers.pdf';
        a.click();
        window.URL.revokeObjectURL(url);
      },
      error: (error) => {
        console.error('Erreur lors de l\'exportation des ateliers en PDF :', error);
        alert('Erreur lors de l\'exportation des ateliers en PDF. Veuillez réessayer.');
      }
    });
  }

  getNomCategorie(atelier: Atelier): string {
    const categorie = this.categories.find(c => c._id === atelier.typeAtelier);
    return categorie ? categorie.nom_categorie : '';
  }

  trierParDateDebut() {
    this.listAteliers.sort((a, b) => {
      return new Date(a.date_debut).getTime() - new Date(b.date_debut).getTime();
    });
  }

  // Méthode pour naviguer vers la page de statistiques de l'atelier sélectionné
  goToStatistiques(atelierId: string) {
    this.router.navigate(['statistiques', atelierId]);
  }
}
