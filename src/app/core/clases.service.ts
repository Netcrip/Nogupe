import { Injectable, Input } from '@angular/core';

import {Muro} from '../interface/muro'
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';



@Injectable({
  providedIn: 'root'
})
export class ClasesService {
  clasCollection: AngularFirestoreCollection<Muro>;
  clases: Observable<Muro[]>;
  clasDoc: AngularFirestoreDocument<Muro>;
  public v:string;
  constructor(public afs: AngularFirestore) {
  this.cargar();
    
  }
  cargar(){
    this.clasCollection = this.afs.collection<Muro>('cursadas/'+this.v+'/muro',ref=>ref.orderBy("fecha","asc") );
    this.clases = this.clasCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Muro;
        const id = a.payload.doc.id;
        console.log(this.v);
        return { id, ...data };
      }))
    );
  }
  getClases() {
    return this.clases;
  }
  addPost(muro: Muro) {
    console.log('NEW COURSE');
    this.clasCollection.add(muro);
  }
}

