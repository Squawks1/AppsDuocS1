import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage {

  email: string = '';
  password: string = '';

  constructor(private alertController: AlertController,
              private router: Router
  ) { }

  //Método para mostrar una alerta de error
  async mostrarAlerta(mensaje: string) {
    const alert = await this.alertController.create({
      header: 'Error',
      message: mensaje,
      buttons: ['OK']
    });
    await alert.present();
  }

  //Función para validar el formato de correo electrónico
  validarEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email)
  }

  //Función para validar los componentes para iniciar sesión
  login() {

    //Validar que el campo del correo electrónico no esté vacío
    if (!this.email) {
      this.mostrarAlerta('El campo del correo no puede estar vacío');
      return;
    }

    //Validar que el formato del correo sea el correcto
    if (!this.validarEmail(this.email)) {
      this.mostrarAlerta('El formato del correo es inválido');
      return;
    }

    //Verificar que la contraseña no esté vacía
    if (!this.password) {
      this.mostrarAlerta('El campo de la contraseña no puede estar vacío');
      return;
    }

    //Verificar que la contraseña tenga un mínimo de longitud
    if (this.password.length < 6) {
      this.mostrarAlerta('La contraseña debe tener un mínimo de 6 caracteres');
      return;
    }

    //Si pasa todas las validaciones, que redireccione a la página home
    this.router.navigate(['/home'], { state: { user: this.email } });

  }

  /* No Todavía

  ngOnInit() {
  }
  */

}
