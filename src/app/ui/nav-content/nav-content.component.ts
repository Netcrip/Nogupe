import { Component, OnInit } from '@angular/core';
import { CursosService} from '../../core/cursos.service';
import { CursosInterface} from '../../interface/cursos-interface';

@Component({
  selector: 'app-nav-content',
  templateUrl: './nav-content.component.html',
  styleUrls: ['./nav-content.component.css']
})
export class NavContentComponent implements OnInit {

  cursos: CursosInterface[];
  editState: boolean = false;
  cursoToEdit: CursosInterface;
  constructor(private cursoService: CursosService) { }

  ngOnInit() {
    this.cursoService.getCursos().subscribe(cursos => {
      this.cursos = cursos;
    });
  }
  editCurso(event, curso: CursosInterface) {
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
  }
}
