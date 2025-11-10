import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage {

  //email: string = '';
  password: string = '';
  usuario: string = '';

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

/*
  //Función para validar el formato de correo electrónico
  validarEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email)
  }
*/

  //Función para validar el formato del nombre de usuario
  validarUsuario(usuario: string): boolean {
    const alfanumericoRegex = /^[a-zA-Z0-9]+$/;
    return alfanumericoRegex.test(usuario)
  }

  //Función para validar los componentes para iniciar sesión
  login() {

/*
  //Verificación del email

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
*/

  // Verificación del usuario

    //Verificar que el usuario cumpla con el formato alfanumérico
    if (!this.usuario) {
      this.mostrarAlerta('El campo del usuario no puede estar vacío');
      return;
    }

    //Validar la longitud del nombre de usuario
    if (this.usuario.length < 3 || this.usuario.length > 8) {
      this.mostrarAlerta('El usuario debe tener entre 3 y 8 caracteres');
      return;
    }

    //Verificar que el nombre de usuario sea alfanumérico
    if (!this.validarUsuario(this.usuario)) {
      this.mostrarAlerta('El usuario solo puede contener letras y números');
      return;
    }

   //Verificación de la contraseña

    //Verificar que la contraseña no esté vacía
    if (!this.password) {
      this.mostrarAlerta('El campo de la contraseña no puede estar vacío');
      return;
    }

    //Verificar que la contraseña esté compuesta sólo de números
    if (!/^\d+$/.test(this.password)) {
      this.mostrarAlerta('La contraseña debe estar compuesta sólo de números');
      return;
    }

    //Verificar que la contraseña tenga un mínimo de longitud
    if (this.password.length != 4) {
      this.mostrarAlerta('La contraseña debe ser de 4 dígitos');
      return;
    }

    //Si pasa todas las validaciones, que redireccione a la página home
    this.router.navigate(['/home'], { state: { user: this.usuario } });

  }

  /*
  registro()
  {
    this.navCtrl.navigateForward(['/registro']);
  }
  */

  /* No Todavía

  ngOnInit() {
  }
  */

}
