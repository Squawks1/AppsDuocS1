import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { ToastController, Platform } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Dbservice {

  private db!: SQLiteObject;

  // Observable
  private isDBReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(
    private sqlite: SQLite, 
    private toastController: ToastController,
    private platform: Platform
  ) {
    this.initDatabase();
  }

  async initDatabase() {
    await this.platform.ready();

    this.sqlite.create({
      name: 'medireminder.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      this.db = db;
      this.createTables();
    }).catch(error => {
      console.log(error);
      this.presentToast("Error al crear la BD: " + error);
    });
  }

  async createTables() {
    try {

      // Tabla usuarios
      await this.db.executeSql(
        `CREATE TABLE IF NOT EXISTS usuarios(
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          nombre TEXT,
          usuario TEXT,
          password TEXT,
          email TEXT
        )`, []
      );

      // Tabla medicamentos
      await this.db.executeSql(
        `CREATE TABLE IF NOT EXISTS medicamentos(
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          nombre TEXT,
          dosis TEXT,
          horario TEXT
        )`, []
      );

      // Tabla recordatorios
      await this.db.executeSql(
        `CREATE TABLE IF NOT EXISTS recordatorios(
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          titulo TEXT,
          fecha TEXT,
          descripcion TEXT
        )`, []
      );

      this.isDBReady.next(true);
      this.presentToast('Base de datos lista');

    } catch (error) {
      this.presentToast('Error al crear las tablas: ' + error);
    }
  }

  // BD lista y armada
  dbReady() {
    return this.isDBReady.asObservable();
  }

  // Función toast para mostrar alerta/mensaje
  private async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000
    });
    toast.present();
  }

  validarUsuario(usuario: string, password: string) {
    return this.db.executeSql('SELECT * FROM usuarios WHERE usuario = ? AND password = ?',
      [usuario, password]).then((res) => {
        if (res.rows.length > 0) {
          return res.rows.item(0); // Retorna primer usuario que coincide
        } else {
          return null; // Si no hace match, retorna null
        }
      })
      .catch(error => this.presentToast('Error al obtener al usuario:' + error));
  }
}

