import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: false,
})
export class HomePage {

  usuarioEmail: string | null = null;
  infoForm: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private alertController: AlertController
  ) {
    // Recibir el usuario desde el login
    const navigation = this.router.getCurrentNavigation();
    // En caso de bypass, que se acceda como Invitado (Ficticio)
    this.usuarioEmail = navigation?.extras.state?.['user'] || 'Invitado';

    // Crear formulario reactivo
    this.infoForm = this.fb.group({
      nombre: [''],
      apellido: [''],
      nivelEducacion: [''],
      fechaNacimiento: ['']
    });
  }

  limpiarCampos() {
    this.infoForm.reset();

    const nombreInput = document.getElementById('nombreInput');
    const apellidoInput = document.getElementById('apellidoInput');

    [nombreInput, apellidoInput].forEach(input => {
      if (input) {
        input.classList.remove('animate-slide');
        void input.offsetWidth;
        input.classList.add('animate-slide');
      }
    });
  }

  async mostrarDatos() {
    const nombre = this.infoForm.get('nombre')?.value
    const apellido = this.infoForm.get('apellido')?.value

    const alert = await this.alertController.create({
      header: 'Usuario',
      message: `Su nombre es ${nombre} ${apellido}`,
      buttons: ['Aceptar']
    });

    await alert.present();
  }
}
