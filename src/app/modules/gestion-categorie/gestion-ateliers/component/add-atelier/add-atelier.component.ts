import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { AtelierService } from 'src/app/core/services/atelier.service';
import { CategorieService } from 'src/app/core/services/categorie.service';
import { Atelier } from 'src/app/core/model/atelier';
import { Categorie } from 'src/app/core/model/categorie';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-atelier',
  templateUrl: './add-atelier.component.html',
  // styleUrls: ['./add-atelier.component.css']
})
export class AddAtelierComponent implements OnInit {
  form: FormGroup;
  categories: Categorie[] = [];
  atelierAjoute: boolean = false; // Indicateur pour afficher le bouton "Voir Carte"
  successMessage: string = ''; // Add this property to hold the success message

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private atelierService: AtelierService,
    private categorieService: CategorieService
  ) {
    this.form = this.fb.group({
      nom: ['', Validators.required],
      description: ['', Validators.required],
      lieu: ['', Validators.required],
      date_debut: ['', Validators.required],
      date_fin: ['', Validators.required],
      Nbr_place: ['', [Validators.required, Validators.min(1)]],
      frequence_de_repetition: ['', Validators.required],
      typeAtelier: ['', Validators.required],
      prix: ['', [Validators.required, Validators.min(0)]],
      frais_de_participation: ['', [Validators.required, this.fraisDeParticipationValidator]],
      image: [null, Validators.required] // Ajout du champ image dans le formulaire avec validation requise
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

  fraisDeParticipationValidator(control: AbstractControl): { [key: string]: any } | null {
    const validValues = ['payant', 'gratuit'];
    if (!validValues.includes(control.value)) {
      return { invalidFraisDeParticipation: true };
    }
    return null;
  }

  addAtelier(): void {
    if (this.form.invalid) {
      // Marquer les champs invalides pour afficher les erreurs
      this.form.markAllAsTouched();
      return;
    }

    const formData = new FormData();
    formData.append('nom', this.form.get('nom')!.value);
    formData.append('description', this.form.get('description')!.value);
    formData.append('lieu', this.form.get('lieu')!.value);
    formData.append('date_debut', this.form.get('date_debut')!.value);
    formData.append('date_fin', this.form.get('date_fin')!.value);
    formData.append('Nbr_place', this.form.get('Nbr_place')!.value);
    formData.append('frequence_de_repetition', this.form.get('frequence_de_repetition')!.value);
    formData.append('typeAtelier', this.form.get('typeAtelier')!.value);
    formData.append('prix', this.form.get('prix')!.value);
    formData.append('frais_de_participation', this.form.get('frais_de_participation')!.value);
    formData.append('image', this.form.get('image')!.value);

    this.atelierService.addAtelier(formData).subscribe(
      (data: Atelier) => {
        console.log('Atelier ajouté avec succès :', data);
        // Marquer que l'atelier a été ajouté avec succès
        this.atelierAjoute = true;
        // Afficher le message de succès
        this.successMessage = 'Atelier ajouté avec succès !';
        // Réinitialiser le formulaire après une soumission réussie
        this.form.reset();
      },
      (error) => {
        console.error('Erreur lors de l\'ajout de l\'atelier :', error);
      }
    );
  }

  onFileChange(event: Event) {
    const file = (event.target as HTMLInputElement).files?.item(0);
    if (file) {
      this.form.get('image')!.setValue(file);
    }
  }

  navigateToMap() {
    this.router.navigate(['/atelier/lieu']);
  }
}
