import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-recordatorios',
  templateUrl: './recordatorios.page.html',
  styleUrls: ['./recordatorios.page.scss'],
  standalone: false,
})
export class RecordatoriosPage {

  recordatorios: { medicamento: string; hora: string; nota?: string }[] = [];
  nuevoMedicamento = '';
  nuevaHora = '';
  nuevaNota = '';

  constructor(private alertController: AlertController) {}

  // Agregar un nuevo recordatorio
  async agregarRecordatorio() {
    if (!this.nuevoMedicamento || !this.nuevaHora) {
      const alert = await this.alertController.create({
        header: 'Campos obligatorios',
        message: 'Debe ingresar un medicamento y una hora.',
        buttons: ['Aceptar']
      });
      await alert.present();
      return;
    }

    this.recordatorios.push({
      medicamento: this.nuevoMedicamento,
      hora: this.nuevaHora,
      nota: this.nuevaNota
    });

    this.nuevoMedicamento = '';
    this.nuevaHora = '';
    this.nuevaNota = '';
  }

  // Eliminar un recordatorio
  eliminarRecordatorio(index: number) {
    this.recordatorios.splice(index, 1);
  }

  /* Se podría immplementar notificaciones para recordar al 
  usuario cuándo debe tomar el medicamento */
}
