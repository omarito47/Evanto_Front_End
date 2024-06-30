import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReclamationManagementRoutingModule } from './reclamation-management-routing.module';
import { ReclamationsComponent } from './component/reclamations/reclamations.component';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ReclamationFormComponent } from './component/reclamation-form/reclamation-form.component';
import { HttpClientModule } from '@angular/common/http';
import { ReclamationDetailsComponent } from './component/reclamation-details/reclamation-details.component';
import { ListServiceComponent } from './component/list-service/list-service.component';
import { GererReclamationComponent } from './component/gerer-reclamation/gerer-reclamation.component';
import { MyReclamationComponent } from './component/my-reclamation/my-reclamation.component';
import { MyReclamationDetailsComponent } from './component/my-reclamation-details/my-reclamation-details.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDividerModule } from '@angular/material/divider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ReclamationChartComponent } from './component/reclamation-chart/reclamation-chart.component';
import { BrowserModule } from '@angular/platform-browser';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { AngularSplitModule } from 'angular-split';

@NgModule({
  declarations: [
    ReclamationsComponent,
    ReclamationFormComponent,
    ReclamationDetailsComponent,
    ListServiceComponent,
    GererReclamationComponent,
    MyReclamationComponent,
    MyReclamationDetailsComponent,
    ReclamationChartComponent
  ],
  imports: [
    CommonModule,
    ReclamationManagementRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatFormFieldModule,
    MatDividerModule,
    MatToolbarModule,
    
    MatTableModule,
    MatMenuModule,
    MatDialogModule,
    MatRadioModule,
    MatCheckboxModule,
    MatTooltipModule,
    AngularSplitModule ,

    TableModule,
    ButtonModule,
    MatSnackBarModule,
  ]
})
export class ReclamationManagementModule { }