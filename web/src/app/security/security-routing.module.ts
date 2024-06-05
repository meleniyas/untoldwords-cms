import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { UserLoginComponent } from './user-login/user-login.component';
import { PanelComponent } from './manager/panel/panel.component';
import { RepositoryComponent } from './manager/repository/repository.component';
import { ManagerComponent } from './manager/manager.component';


const routes: Routes = [


  {
    path: '',
    component: ManagerComponent,
    children: [
      { path: 'repository', component: RepositoryComponent },
      { path: 'panel', component: PanelComponent },
      { path: '**', redirectTo: 'panel' }
    ]
  },
  { path: '**', redirectTo: '' }



]


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class SecurityRoutingModule { }
