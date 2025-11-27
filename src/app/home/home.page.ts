import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit{
  usuarioEmail: string = 'Invitado';
  MediReminder: string = 'MediReminder';

  constructor(private router: Router, private menu: MenuController) {
    const navigation = this.router.getCurrentNavigation();
    //Validación para entrar con un usuario o invitado
    this.usuarioEmail = navigation?.extras.state?.['user'] || 'Invitado';
  }

  // Cerrar el menú lateral
  ngOnInit(): void {
    this.menu.close("mainMenu")
  }

}
