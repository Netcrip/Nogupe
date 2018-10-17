import { Injectable } from '@angular/core';

import {CursosInterface} from '../interface/cursos-interface'
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import {AuthService} from '../core/auth.service';


@Injectable({
  providedIn: 'root'
})
export class CursosService {
  cursosCollection: AngularFirestoreCollection<CursosInterface>;
  cursos: Observable<CursosInterface[]>;
  cursoDoc: AngularFirestoreDocument<CursosInterface>;


  constructor(public afs: AngularFirestore, public auth: AuthService) {
    var uid=  auth.getuid();
    this.cursosCollection = afs.collection<CursosInterface>('inscripciones', ref => ref.where('userid',"==",uid));
    this.cursos = this.cursosCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as CursosInterface;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }
  getCursos() {
    return this.cursos;
  }
  addCurso(curso: CursosInterface) {
    console.log('NEW COURSE');
    this.cursosCollection.add(curso);
  }
  deleteCurso(curso: CursosInterface) {
    this.cursoDoc = this.afs.doc(`cursos/${curso.id}`);
    this.cursoDoc.delete();
  }
  updateCurso(curso: CursosInterface) {
    this.cursoDoc = this.afs.doc(`cursos/${curso.id}`);
    this.cursoDoc.update(curso);
  }
}
