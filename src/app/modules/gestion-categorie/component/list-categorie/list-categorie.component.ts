import { Component } from '@angular/core';
import { CategorieService } from 'src/app/core/services/categorie.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-categorie',
  templateUrl: './list-categorie.component.html',
//styleUrls: ['./add-categorie.component.css']
})
export class ListCategorieComponent{
  form: any = {}; // Définir votre modèle de catégorie ici

  constructor(private categorieService: CategorieService, private router: Router) {}

  onSubmit(): void {
    if (this.form.nom_categorie) { // Vérifiez que le champ est rempli
      this.categorieService.addCategorie(this.form).subscribe(
        (data: any) => {
          console.log('Catégorie ajoutée avec succès:', data);
          alert('Catégorie ajoutée avec succès !');
          this.router.navigate(['/']); // Rediriger après ajout
        },
        (error: any) => {
          console.log('Erreur lors de l\'ajout de la catégorie:', error);
          alert('Erreur lors de l\'ajout de la catégorie : ' + error.message);
        }
      );
    } else {
      alert('Veuillez remplir tous les champs.');
    }
  }
}
