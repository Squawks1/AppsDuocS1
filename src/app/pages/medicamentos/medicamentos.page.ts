import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-medicamentos',
  templateUrl: './medicamentos.page.html',
  styleUrls: ['./medicamentos.page.scss'],
  standalone: false,
})
export class MedicamentosPage implements OnInit{

  MediReminder: string = 'MediReminder';
  medicamentos: { nombre: string; dosis: string; horario: string }[] = [];

  constructor(private alertCtrl: AlertController, private menu: MenuController) {}

  //Agregar medicamento
  async agregarMedicamento() {
    const alert = await this.alertCtrl.create({
      header: 'Agregar Medicamento',
      inputs: [
        { name: 'nombre', type: 'text', placeholder: 'Nombre del medicamento' },
        { name: 'dosis', type: 'text', placeholder: 'Dosificación Ej: 500 mg' },
        { name: 'horario', type: 'text', placeholder: 'Tiempo Ej: Cada 8 horas' },
      ],
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Guardar',
          handler: (data) => {
            if (data) {
              console.log(data);
              return true;
            }
            return false;
          },
        },
      ],
    });
    await alert.present();
  }

  //Editar medicamento
  async editarMedicamento(index: number) {
    const med = this.medicamentos[index];
    const alert = await this.alertCtrl.create({
      header: 'Editar Medicamento',
      inputs: [
        { name: 'nombre', type: 'text', value: med.nombre },
        { name: 'dosis', type: 'text', value: med.dosis },
        { name: 'horario', type: 'text', value: med.horario },
      ],
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Actualizar',
          handler: (data) => {
            this.medicamentos[index] = data;
          },
        },
      ],
    });
    await alert.present();
  }

  //Eliminar medicamento
  async eliminarMedicamento(index: number) {
    const alert = await this.alertCtrl.create({
      header: 'Eliminar',
      message: `¿Seguro que deseas eliminar <strong>${this.medicamentos[index].nombre}</strong>?`,
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Eliminar',
          handler: () => {
            this.medicamentos.splice(index, 1);
          },
        },
      ],
    });
    await alert.present();
  }

  // Cerrar el menú lateral
  ngOnInit(): void {
    this.menu.close("mainMenu")
  }
}
