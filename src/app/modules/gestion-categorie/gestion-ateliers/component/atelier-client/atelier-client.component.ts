import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Atelier } from 'src/app/core/model/atelier';
import { AtelierService } from 'src/app/core/services/atelier.service';
import { CategorieService } from 'src/app/core/services/categorie.service';
import { Categorie } from 'src/app/core/model/categorie';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-atelier-client',
  templateUrl: './atelier-client.component.html',
  // styleUrls: ['./atelier-client.component.css']
})
export class AtelierClientComponent implements OnInit, AfterViewInit, OnDestroy {

  ateliers: Atelier[] = [];
  categories: Categorie[] = [];
  ateliersParLieu: any;
  subscriptions: Subscription[] = [];
  loading: boolean = false;
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
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
      image: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadAteliersAndCategories();
  }

  ngAfterViewInit(): void {
    // Code à exécuter après l'initialisation de la vue
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  loadAteliersAndCategories() {
    this.loading = true;
    const atelierSub = this.atelierService.fetchAll().subscribe(
      (data: Atelier[]) => {
        this.ateliers = data;
        this.loadCategories();
        this.regrouperAteliersParLieu();
        this.loading = false;
      },
      error => {
        this.handleError('Erreur lors du chargement des ateliers', error);
      }
    );
    this.subscriptions.push(atelierSub);
  }

  loadCategories() {
    const categorieSub = this.categorieService.getCategories().subscribe(
      (categories) => {
        this.categories = categories;
      },
      (error) => {
        this.handleError('Erreur lors du chargement des catégories', error);
      }
    );
    this.subscriptions.push(categorieSub);
  }

  regrouperAteliersParLieu(): void {
    const regroupSub = this.atelierService.regrouperAteliersParLieu().subscribe(
      data => {
        this.ateliersParLieu = data;
      },
      error => {
        this.handleError('Erreur lors du regroupement des ateliers par lieu', error);
      }
    );
    this.subscriptions.push(regroupSub);
  }

  getNomCategorie(atelier: Atelier): string {
    const categorie = this.categories.find(c => c._id === atelier.typeAtelier);
    return categorie ? categorie.nom_categorie : '';
  }

  handleError(message: string, error: any): void {
    console.error(message, error);
    this.loading = false;
    // Optionally display a user-friendly message
  }

  submitForm(): void {
    if (this.form.invalid) {
      // Marquer les champs invalides pour afficher les erreurs
      this.form.markAllAsTouched();
      return;
    }

    const formData = this.form.value;
    this.atelierService.addAtelier(formData).subscribe(
      (data: Atelier) => {
        console.log('Atelier ajouté avec succès :', data);
        // Réinitialiser le formulaire après une soumission réussie
        this.form.reset();
      },
      (error) => {
        this.handleError('Erreur lors de l\'ajout de l\'atelier', error);
      }
    );
  }

  onFileChange(event: Event) {
    const file = (event.target as HTMLInputElement).files?.item(0);
    if (file) {
      this.form.get('image')!.setValue(file);
    }
  }
}
