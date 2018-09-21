import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { AuthService } from '../../core/auth.service';
//import { PassThrough } from 'stream';

@Component({
  selector: 'user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css'],
})
export class UserLoginComponent {
private d=[];
  constructor(public auth: AuthService,
              private router: Router) { }

  /// Social Login
  async signInWithGithub() {
    await this.auth.githubLogin();
    return await this.afterSignIn();
  }

  async signInWithGoogle() {
    await this.auth.googleLogin();
    return await this.afterSignIn();
  }

  async signInWithFacebook() {
    await this.auth.facebookLogin();
    await this.afterSignIn();
  }

  async signInWithTwitter() {
    await this.auth.twitterLogin();
    return await this.afterSignIn();
  }


 async login(email,pas){
    console.log(email.value,pas.value);
    await this.auth.emailLogin(email.value,pas.value);
    return await this.afterSignIn();
  }
  ////
  singout(){
    this.auth.signOut();
  }
  //
  async singup(email,pas){
    await this.auth.emailSignUp(email.value,pas.value);
    return await this.afterSignIn();
  }
  /// Shared
  private afterSignIn() {
    // Do after login stuff here, such router redirects, toast messages, etc.
    return this.router.navigate(['notes']);
  }

  //otra
  
  docu(d : string){
    this.auth.docu(d);
  }
    

}