import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})

export class LoginPage {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private alertController: AlertController,
    private router: Router
  ) {
    // Formulario reactivo y sus validaciones
    this.loginForm = this.fb.group({
      usuario: [
        '',
        [
          Validators.required,
          // 3 a 8 caracteres alfanuméricos
          Validators.pattern(/^[a-zA-Z0-9]{3,8}$/) 
        ]
      ],
      password: [
        '',
        [
          Validators.required,
          // Contraseña de 4 números
          Validators.pattern(/^\d{4}$/) 
        ]
      ]
    });
  }

  // Mostrar alertas
  async mostrarAlerta(mensaje: string) {
    const alert = await this.alertController.create({
      header: 'Error',
      message: mensaje,
      buttons: ['Aceptar']
    });
    await alert.present();
  }

  // Función login
  login() {
    if (this.loginForm.invalid) {
      // Mensaje general
      this.mostrarAlerta('Por favor, verifica los campos ingresados.');
      return;
    }

    const { usuario } = this.loginForm.value;
    this.router.navigate(['/home'], { state: { user: usuario } });
  }

  registro() {
    this.router.navigate(['/registro']);
  }
}
