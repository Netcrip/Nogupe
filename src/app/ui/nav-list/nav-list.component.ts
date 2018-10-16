import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../core/auth.service'
@Component({
  selector: 'app-nav-list',
  templateUrl: './nav-list.component.html',
  styleUrls: ['./nav-list.component.css']
})
export class NavListComponent implements OnInit {

  constructor(private auth:AuthService) { }

  ngOnInit() {
  }
  linkgooglr(){
  this.auth.linkgoogleLogin();
  }
  linkface(){
    this.auth.linkface();
  }
}
