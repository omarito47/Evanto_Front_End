import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListeUserComponent } from './components/liste-user/liste-user.component';
import { ViewUserComponent } from './components/view-user/view-user.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { AuthGuard } from 'src/app/core/services/auth.guard';
import { DashbordComponent } from './components/dashbord/dashbord.component';
import { UserFormClientComponent } from './components/user-form-client/user-form-client.component';

const routes: Routes = [
  { path: 'liste-user', component: ListeUserComponent ,canActivate: [AuthGuard]},
  { path: 'view-user', component: ViewUserComponent,canActivate: [AuthGuard] },
  { path: 'users/add', component: UserFormComponent ,canActivate: [AuthGuard]},
  { path: 'users/edit/:id', component: UserFormComponent,canActivate: [AuthGuard]},
  { path: 'edit-user/:id',component: UserFormClientComponent,canActivate: [AuthGuard]},
  {path: 'dashboard', component:DashbordComponent,canActivate: [AuthGuard]}

];

@NgModule({
    imports: [
      RouterModule.forChild(routes)
    ],
    exports: [
      RouterModule
    ]
  })

export class UserManagementRoutingModule { }
