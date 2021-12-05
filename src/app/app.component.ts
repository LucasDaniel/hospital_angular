import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Login sistema Hospital';
  permissao;

  constructor(private router: Router) {

  }

  ngOnInit(): void {
    let isLogged = JSON.parse(localStorage.getItem('isLogged'));
    if (isLogged) {
      this.permissao = localStorage.getItem('permissao');
      this.router.navigate(['/candidatos']);
    } else {
      this.router.navigate(['/logar']);
    }

  }



}
