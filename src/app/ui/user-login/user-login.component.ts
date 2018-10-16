import { Component} from '@angular/core';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { AuthService } from '../../core/auth.service';
import { Input } from '@angular/compiler/src/core';
//import { PassThrough } from 'stream';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}


@Component({
  selector: 'user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css'],
})
export class UserLoginComponent {
  hide = true;
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  matcher = new MyErrorStateMatcher();

private d=[];
  constructor(public auth: AuthService,
              private router: Router) {
                if(auth.user){
                  this.router.navigate(['private'])
                }
               }

  async create(email, nombre,pas,pas1,dni){
   // this.singup(email.value,pas.value,dni.value,nombre.value,document.querySelector('input[name="optionsRadios"]:checked').value);
    this.auth.docu(dni.value).subscribe(success=> {
      if(success==true){
        this.auth.usuariosdocu(dni.value).subscribe(succes=> {
          if(succes==true){
            this.singup(email.value,pas.value,dni.value,nombre.value,document.querySelector<any>('input[name="optionsRadios"]:checked').value);
          }else{
            console.log("dni repetido"); 
          }
        },error=>{
          console.log(error);
        });
      }else{
        console.log("dni Incorrecto");
      }
    },error=>{
      console.log(error);
    });
        

 
  }

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
    await this.auth.emailLogin(email.value,pas.value);
    return await this.afterSignIn();
  }
  ////
  singout(){
    this.auth.signOut();
  }
  //
  async singup(email,pas,dni,nombre,avatar){
    //console.log(email, pas, dni, nombre, avatar);
    await this.auth.emailSignUp(email,pas,dni,nombre,avatar);
    return await this.afterSignIn();
  }
  /// Shared
  async afterSignIn() {
    // Do after login stuff here, such router redirects, toast messages, etc.
    return await this.router.navigate(['private']);
  }

  //otra

  async midoc(d : string){
    return await this.auth.docu(d);
  }
    

}