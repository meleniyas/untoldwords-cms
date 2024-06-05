import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { HomeComponent } from './pages/home/home.component';
import { UserLoginComponent } from './security/user-login/user-login.component';


const routes: Routes = [
  {
    path: "", component: HomeComponent
  },
  {
    path: "login", component: UserLoginComponent
  },
  {
    path: 'manager',
    loadChildren: () => import('./security/security.module').then(m => m.SecurityModule),
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
