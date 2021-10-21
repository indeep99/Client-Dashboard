import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientProfileComponent } from './components/client-profile/client-profile.component';
import { CreateProjectEntryComponent } from './components/create-project-entry/create-project-entry.component';
import { DisplaySingleProjectComponent } from './components/display-single-project/display-single-project.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { UpdateUserProfileComponent } from './components/update-user-profile/update-user-profile.component';
import { UsersComponent } from './components/users/users.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'users',
    children: [
      {
        path: '',
        component: UsersComponent
      },
      {
        path: ':id',
        component: ClientProfileComponent
      }
    ]    
  },
  {
    path: 'update-profile',
    component: UpdateUserProfileComponent,
    canActivate:  [AuthGuard]
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'create-project-entry',
    component: CreateProjectEntryComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  }, 
  {
    path: 'project/:id',
    component: DisplaySingleProjectComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
