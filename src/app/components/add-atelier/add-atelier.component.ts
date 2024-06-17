import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AtelierService } from 'src/app/services/atelier.service';
import { CategorieService } from 'src/app/services/categorie.service';
import { Atelier } from 'src/app/model/atelier';
import { Categorie } from 'src/app/model/categorie';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-atelier',
  templateUrl: './add-atelier.component.html',
  styleUrls: ['./add-atelier.component.css']
})
export class AddAtelierComponent implements OnInit {
  form: FormGroup; // Utilisation de FormGroup
  categories: Categorie[] = [];

  constructor(
    private fb: FormBuilder, // Utilisation de FormBuilder
    private router: Router,
    private atelierService: AtelierService,
    private categorieService: CategorieService
  ) {
    this.form = this.fb.group({ // Initialisation de FormGroup avec FormBuilder
      nom: ['', Validators.required],
      description: ['', Validators.required],
      lieu: ['', Validators.required],
      date_debut: ['', Validators.required],
      date_fin: ['', Validators.required],
      Nbr_place: ['', Validators.required],
      frequence_de_repetition: ['', Validators.required],
      typeAtelier: ['', Validators.required],
      prix: ['', Validators.required],
      frais_de_participation: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadCategories();
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

  addAtelier(): void {
    this.atelierService.addAtelier(this.form.value).subscribe(
      (data) => {
        console.log('Atelier ajouté avec succès :', data);
        // Réinitialiser le formulaire après une soumission réussie
        this.form.reset();
      },
      (error) => {
        console.error('Erreur lors de l\'ajout de l\'atelier :', error);
      }
    );
  }
}
