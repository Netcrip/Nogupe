import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './core/auth.guard';
import { UserLoginComponent } from './ui/user-login/user-login.component';
import { HomePageComponent } from './ui/home-page/home-page.component';
import { NotesListComponent } from './ui/notes-list/notes-list.component';
import {SidenavComponent} from './ui/sidenav/sidenav.component';
import {CursosComponent} from './ui/cursos/cursos.component';
import {ClaseComponent} from './ui/clase/clase.component';


const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'login', component: UserLoginComponent },
  { path: 'cursos', component: CursosComponent,  canActivate: [AuthGuard] },
  {path: "clase/:id", component: ClaseComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }