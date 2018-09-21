import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/auth.service';
@Component({
  selector: 'app-notes-list',
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.css']
})
export class NotesListComponent implements OnInit {

  constructor(public auth: AuthService) { }

  ngOnInit() {
  }

  linkgooglr(){
    this.auth.linkgoogleLogin();
  }
  linkface(){
    this.auth.linkface();
  }


}
