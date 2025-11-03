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

  //Método para mostrar una alerta de error
  async mostrarAlerta(mensaje: string) {
    const alert = await this.alertController.create({
      header: 'Error',
      message: mensaje,
      buttons: ['OK']
    });
    await alert.present();
  }

  //Método para capitalizar nombres
  capitalizar(usuario: string): string {
  if (!usuario) return '';
  return usuario
    .toLowerCase()
    .split(' ')
    .map(palabra => palabra.charAt(0).toUpperCase() + palabra.slice(1))
    .join(' ');
  }

  //Función para limpiar los inputs ingresados
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

  //Función para mostrar los datos registrados en el input
  async mostrarDatos() {
    const nombre = this.capitalizar(this.infoForm.get('nombre')?.value?.trim());
    const apellido = this.capitalizar(this.infoForm.get('apellido')?.value?.trim());
    const fechaNacimiento = this.infoForm.get('fechaNacimiento')?.value;

    //Validar que no hayan campos vacíos en nombre y apellido
    if (!nombre) {
      this.mostrarAlerta('El campo "Nombre" no puede estar vacío');
      return;
    }

    if (!apellido) {
      this.mostrarAlerta('El campo "Apellido" no puede estar vacío');
      return;
    }

    // Validar solo letras y caracteres permitidos para nombre y apellido
    const soloLetras = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+$/;
    if (!soloLetras.test(nombre)) {
      this.mostrarAlerta('El nombre solo puede contener letras');
      return;
    }

    if (!soloLetras.test(apellido)) {
      this.mostrarAlerta('El apellido solo puede contener letras');
      return;
    }

    // Validar que la fecha de nacimiento no sea una futura
    if (fechaNacimiento) {
      const hoy = new Date();
      const fechaNac = new Date(fechaNacimiento);

      if (fechaNac > hoy) {
        this.mostrarAlerta('La fecha de nacimiento no puede ser futura');
        return;
      }
    }

    //Si pasa las validaciones básicas, que muestre la ventana de info
    const alert = await this.alertController.create({
      header: 'Usuario',
      message: `Su nombre es ${nombre} ${apellido}`,
      buttons: ['Aceptar']
    });

    await alert.present();
  }
}
