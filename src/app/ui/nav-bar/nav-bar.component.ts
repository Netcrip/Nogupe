import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../core/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor(public auth: AuthService, 
    private router: Router) { }

  ngOnInit() {
  }

  irlogin(){
    this.router.navigate(['login']);
  }

}
