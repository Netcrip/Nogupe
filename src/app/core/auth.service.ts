import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';

import { Observable, of } from 'rxjs';
import { switchMap} from 'rxjs/operators';
import * as firebase from 'firebase/app';



interface User {
  uid: string;
  email: string;
  photoURL?: string;
  displayName?: string;
  favoriteColor?: string;
}
interface dni{
  Dni:string;
  Quees:string;
}


@Injectable()
export class AuthService {

  user: Observable<User>;
  dni:Observable<dni[]>;
  dniCollection: AngularFirestoreCollection<dni>;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router
  ) {

      //// Get auth data, then get firestore user document || null
      this.user = this.afAuth.authState.pipe(
        switchMap(user => {
          if (user) {
            return this.afs.doc<User>(`users/${user.uid}`).valueChanges()
          } else {
            return of(null)
          }
        })
      )
      
    }

////// OAuth Methods /////
linkgoogleLogin() {
  //return this.afAuth.auth.signInWithPopup( new firebase.auth.GoogleAuthProvider);
  const provider = new auth.GoogleAuthProvider();
  //return this.oAuthLogin(provider);
  return firebase.auth().currentUser.linkWithPopup(provider).then(function(result) {
    if (result.credential) {
       console.log("Accounts successfully linked");
      //var credential = result.credential;
      //var user = result.user;
      // ...
    }
  }).catch(function(error) {
    console.log(error);
  });;
}
linkface() {
  //return this.afAuth.auth.signInWithPopup( new firebase.auth.GoogleAuthProvider);
  const provider = new auth.FacebookAuthProvider();
  //return this.oAuthLogin(provider);
  return firebase.auth().currentUser.linkWithPopup(provider).then(function(result) {
    if (result) {
       console.log("Accounts successfully linked");
      //var credential = result.credential;
      //var user = result.user;
      // ...
    }
    else{
      console.log("se encuentra vinculado");
    }
  }).catch(function(error) {
   console.log(error);
  });;

}
googleLogin() {
  return this.afAuth.auth.signInWithPopup( new firebase.auth.GoogleAuthProvider);
  //const provider = new auth.GoogleAuthProvider();
//  return this.oAuthLogin(provider);
  //return firebase.auth().currentUser.linkWithRedirect(provider);


}
githubLogin() {
  const provider = new auth.GithubAuthProvider();
  return this.oAuthLogin(provider);
}

facebookLogin() {
  const provider = new firebase.auth.FacebookAuthProvider();
  //return this.oAuthLogin(provider);
  firebase.auth().signInWithPopup(provider).then(function(result) {
    // This gives you a Facebook Access Token. You can use it to access the Facebook API.
    //var token = result.credential.accessToken;
    // The signed-in user info.
    //var user = result.user;
    // ...
  }).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
  });
}

twitterLogin() {
  const provider = new auth.TwitterAuthProvider();
  return this.oAuthLogin(provider);
}

private oAuthLogin(provider: any) {
  return this.afAuth.auth
    .signInWithPopup(provider)
    .then(credential => {
      //this.notify.update('Welcome to Firestarter!!!', 'success');
      return credential.user;
    })
    .catch(error => this.handleError(error));
}


//// Email/Password Auth ////
emailSignUp(email: string, password: string) {
  return this.afAuth.auth
    .createUserWithEmailAndPassword(email, password)
    .then(credential => {
     // this.notify.update('Welcome new user!', 'success');
      return this.updateUserData(credential.user); // if using firestore
    })
    .catch(error => this.handleError(error));
}

// documento
docu(nrodni:string) {
   
   this.afs.collection("Dni").ref.where("Dni","==",nrodni).get().then(function(collection){
     if(!collection.empty){
       console.log("algo hay:",collection.docs[0].data());
       const miinfo=collection.docs[0].data() as dni;
       console.log(miinfo.Quees)
     }else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
  }
  
   })
}
//logine email

emailLogin(email: string, password: string) {
  return this.afAuth.auth
    .signInWithEmailAndPassword(email, password)
    /*.then(credential => {
     // this.notify.update('Welcome back!', 'success');
      return this.updateUserData(credential.user);
    })
    .catch(error => this.handleError(error));*/
}

// Sends email allowing user to reset password
resetPassword(email: string) {
  const fbAuth = auth();

  return fbAuth
    .sendPasswordResetEmail(email)
    //.then(() => this.notify.update('Password update email sent', 'info'))
    .catch(error => this.handleError(error));
}

signOut() {
  this.afAuth.auth.signOut().then(() => {
    this.router.navigate(['']);
  });
}

// If error, console log and notify user
private handleError(error: Error) {
  console.error(error);
  //this.notify.update(error.message, 'error');
}

// Sets user data to firestore after succesful login
private updateUserData(user: User) {
  const userRef: AngularFirestoreDocument<User> = this.afs.doc(
    `users/${user.uid}`
  );
  const data: User = {
    uid: user.uid,
    email: user.email || null,
    displayName: user.displayName || 'nameless user',
    photoURL: user.photoURL || 'https://goo.gl/Fz9nrQ'
  };
  return userRef.set(data);
}
}