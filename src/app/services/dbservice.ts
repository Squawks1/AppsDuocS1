import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { ToastController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Dbservice {
  private db!: SQLiteObject;

    // Observable
    private isDBReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private sqlite: SQLite, private toastController: ToastController) {
    this.initDatabase();
  }

  async initDatabase() {
    this.sqlite.create({
      name: 'medireminder.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      this.db = db;
      this.createTables();
      this.isDBReady.next(true); // True cuando la BD esté lista
      this.presentToast('Base de datos y tablas creadas con éxito');
    }).catch(error => console.log(error));
  }

  async createTables() {

    // Tabla usuarios
    await this.db.executeSql(`CREATE TABLE IF NOT EXISTS usuarios(
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nombre TEXT,
      usuario TEXT,
      password TEXT,
      email TEXT      
    )`, [])
    .then(() => this.presentToast('Tabla creada exitosamente'))
    .catch(error => this.presentToast('Error al crear la tabla: ' + error));

    // Tabla medicamentos
    await this.db.executeSql(`CREATE TABLE IF NOT EXISTS medicamentos(
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nombre TEXT,
      dosis TEXT,
      horario TEXT
    )`, [])
    .then(() => this.presentToast('Tabla creada exitosamente'))
    .catch(error => this.presentToast('Error al crear la tabla: ' + error));

    // Tabla recordatorios
    await this.db.executeSql(`CREATE TABLE IF NOT EXISTS recordatorios(
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      titulo TEXT,
      fecha TEXT,
      descripcion TEXT
    )`, [])
    .then(() => this.presentToast('Tabla creada exitosamente'))
    .catch(error => this.presentToast('Error al crear la tabla: ' + error));
  }

  // Función toast para mostrar alerta/mensaje
  private async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }
}
