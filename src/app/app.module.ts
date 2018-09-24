import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';
import { UserProfileComponent } from './ui/user-profile/user-profile.component';
import { AppRoutingModule } from './app-routing.module';
import { UserLoginComponent } from './ui/user-login/user-login.component';
import { HomePageComponent } from './ui/home-page/home-page.component';
import { NotesListComponent } from './ui/notes-list/notes-list.component';
import {AuthService} from './core/auth.service';
import { NavBarComponent } from './ui/nav-bar/nav-bar.component';
import { SidenavComponent } from './ui/sidenav/sidenav.component';
import { LayoutModule } from '@angular/cdk/layout';

//import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule } from '@angular/material';
import { NavListComponent } from './ui/nav-list/nav-list.component';
import { NavContentComponent } from './ui/nav-content/nav-content.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';


import {MaterialComponetnModule} from './material-componetn/material-componetn.module';
import { PrivateZoneComponent } from './ui/private-zone/private-zone.component';

@NgModule({
  declarations: [
    AppComponent,
    UserProfileComponent,
    UserLoginComponent,
    HomePageComponent,
    NotesListComponent,
    NavBarComponent,
    SidenavComponent,
    NavListComponent,
    NavContentComponent,
    PrivateZoneComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase), // imports firebase/app needed for everything
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    AngularFireStorageModule, // imports firebase/storage only needed for storage features,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    //MatToolbarModule,
    //MatButtonModule,
    //MatSidenavModule,
    //MatIconModule,
    //MatListModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialComponetnModule


    
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
