import { Component, OnInit } from '@angular/core';
import {ClasesService} from '../../core/clases.service';
import {Muro} from '../../interface/muro';
import { AuthService } from '../../core/auth.service';


@Component({
  selector: 'app-clase',
  templateUrl: './clase.component.html',
  styleUrls: ['./clase.component.css']
})

export class ClaseComponent implements OnInit {
  clases: Muro[];
  mensaje:Muro;
  constructor(private claseService: ClasesService,public auth: AuthService
      ) { }

  ngOnInit() {
    this.claseService.v="3HrVZChgAwcomPsit3Fz";
    this.claseService.cargar();
    this.claseService.getClases().subscribe(clases => {
    this.clases = clases;
    });
  }
  clase(){
    
  }
  post(nom,txt){
    
    var d=this.formattedDate()
    this.mensaje={fecha:d,nombre:nom,texto:txt.value}

    this.claseService.addPost(this.mensaje);
    txt.value="";
  }



  formattedDate(d = new Date) {
    let month = String(d.getMonth() + 1);
    let day = String(d.getDate());
    const year = String(d.getFullYear());
    let hora =String(d.getHours());
    let min = String(d.getMinutes());
    let sec = String(d.getSeconds());
  
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    if(sec.length<2) sec='0'+sec;
    if(min.length<2) min='0'+min;
    if(hora.length<2) hora='0'+hora;
  
    return `${day}/${month}/${year} ${hora}:${min}:${sec}`;
  }
}
