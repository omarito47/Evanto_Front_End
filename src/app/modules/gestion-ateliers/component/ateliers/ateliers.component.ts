import { Component, OnInit } from '@angular/core';
import { Atelier } from 'src/app/core/model/atelier';
import { AtelierService } from 'src/app/core/services/atelier.service';
import { CategorieService } from 'src/app/core/services/categorie.service';
import { Categorie } from 'src/app/core/model/categorie';
import { Router } from '@angular/router'; // Importer Router

@Component({
  selector: 'app-ateliers',
  templateUrl: './ateliers.component.html',
  //styleUrls: ['./ateliers.component.css']
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
      const formData = new FormData();
      formData.append('nom', this.editingAtelier.nom);
      formData.append('description', this.editingAtelier.description);
      formData.append('lieu', JSON.stringify(this.editingAtelier.lieu)); // Convertir Lieu en string
  
      // Convertir et vérifier date_debut
      const dateDebut = new Date(this.editingAtelier.date_debut);
      if (dateDebut instanceof Date && !isNaN(dateDebut.getTime())) {
        console.log('Date de début avant conversion :', dateDebut);
        formData.append('date_debut', dateDebut.toISOString());
      } else {
        console.error('Date de début invalide :', this.editingAtelier.date_debut);
        alert('La date de début est invalide.');
        return;
      }
  
      // Convertir et vérifier date_fin
      const dateFin = new Date(this.editingAtelier.date_fin);
      if (dateFin instanceof Date && !isNaN(dateFin.getTime())) {
        console.log('Date de fin avant conversion :', dateFin);
        formData.append('date_fin', dateFin.toISOString());
      } else {
        console.error('Date de fin invalide :', this.editingAtelier.date_fin);
        alert('La date de fin est invalide.');
        return;
      }
  
      formData.append('Nbr_place', this.editingAtelier.Nbr_place.toString());
      formData.append('frequence_de_repetition', this.editingAtelier.frequence_de_repetition);
      formData.append('typeAtelier', this.editingAtelier.typeAtelier);
      formData.append('prix', this.editingAtelier.prix.toString());
      formData.append('frais_de_participation', this.editingAtelier.frais_de_participation.toString());
  
      const imageFile = (document.getElementById('image') as HTMLInputElement).files?.item(0);
      if (imageFile) {
        formData.append('image', imageFile);
      }
  
      this.atelierService.updateAtelier(this.editingAtelier._id, formData).subscribe({
        next: (updatedAtelier) => {
          console.log('Atelier mis à jour', updatedAtelier);
          this.editingAtelier = null; // ou toute autre logique pour arrêter l'édition
          this.getAllAteliers(); // recharger la liste des ateliers
        },
        error: (err) => {
          console.error('Erreur lors de la mise à jour de l\'atelier', err);
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

  goToAddQuiz(atelierId: string): void {
    this.router.navigate(['/atelier', atelierId, 'add-quiz']);
  }

  
}
