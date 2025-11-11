import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
  standalone: false,
})

export class RegistroPage {
  registroForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private alertController: AlertController
  ) {
    this.registroForm = this.fb.group({
      nombre: ['', Validators.required],
      usuario: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[a-zA-Z0-9]{3,8}$/)
        ]
      ],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]],
      confirmarPassword: ['', Validators.required]
    }, { validators: this.passwordsCoinciden });
  }

  // Validador para verificar contraseñas iguales
  passwordsCoinciden(form: FormGroup) {
    const pass = form.get('password')?.value;
    const confirmar = form.get('confirmarPassword')?.value;
    return pass === confirmar ? null : { noCoinciden: true };
  }

  async mostrarAlerta(titulo: string, mensaje: string) {
    const alert = await this.alertController.create({
      header: titulo,
      message: mensaje,
      buttons: ['Aceptar']
    });
    await alert.present();
  }

  // Función registro con varios mensajes de validaciones
  async registrar() {
    if (this.registroForm.invalid) {
      if (this.registroForm.errors?.['noCoinciden']) {
        this.mostrarAlerta('Contraseña', 'Las contraseñas no coinciden.');
      } else {
        this.mostrarAlerta('Campos inválidos', 'Por favor, verifica los datos ingresados.');
      }
      return;
    }

    // Si está todo correcto, que se registre la cuenta
    this.mostrarAlerta('Registro exitoso', 'Su cuenta ha sido creada correctamente.');
    this.router.navigate(['/login']);
  }
}
