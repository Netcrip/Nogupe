import { Component, OnInit } from '@angular/core';
import {CursosService} from '../../core/cursos.service';
import {CursosInterface} from '../../interface/cursos-interface';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css']
})
export class CursosComponent implements OnInit {
    cursos: CursosInterface[];
    editState: boolean = false;
    cursoToEdit: CursosInterface;
    constructor(private cursoService: CursosService) { }
  
    ngOnInit() {
      this.cursoService.getCursos().subscribe(cursos => {
        this.cursos = cursos;
      });
    }
    /*editCurso(event, curso: CursosInterface) {
      this.editState = true;
      this.cursoToEdit = curso;
    }
    onUdpdateCurso(curso: CursosInterface) {
      this.cursoService.updateCurso(curso);
      this.clearState();
    }
    deleteCurso(event, curso: CursosInterface) {
      this.cursoService.deleteCurso(curso);
      this.clearState();
    }
    clearState() {
      this.editState = false;
      this.cursoToEdit = null;
    }*/
    irclase(s){
    

    }
}
