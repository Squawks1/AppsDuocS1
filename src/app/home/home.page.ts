import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: false,
})
export class HomePage {
  usuarioEmail: string = 'Invitado';

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    //Validación para entrar con un usuario o invitado
    this.usuarioEmail = navigation?.extras.state?.['user'] || 'Invitado';
  }
}
