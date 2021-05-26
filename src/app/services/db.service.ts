import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Dogs } from './dogs';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';

@Injectable({
  providedIn: 'root'
})

export class DbService {

  private storage: SQLiteObject;
  dogsList = new BehaviorSubject([]);
  private isDbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

  //Creacion de bd
  constructor(
    private platform: Platform,
    private sqlite: SQLite,
    private httpClient: HttpClient,
    private sqlPorter: SQLitePorter,
  ) {
    this.platform.ready().then(() => {
      this.sqlite.create({
        name: 'positronx_db.db',
        location: 'default'
      })
      .then((db: SQLiteObject) => {
          this.storage = db;
          this.getFakeData();
      });
    });
  }

  //Funcion para verificar la bd
  dbState() {
    return this.isDbReady.asObservable();
  }

  //Funcion para verificar el arreglo de perros
  fetchDogs(): Observable<Dogs[]> {
    return this.dogsList.asObservable();
  }

  // Desplegar info de perros desde la bd
  getFakeData() {
    this.httpClient.get(
      'assets/dump.sql',
      { responseType: 'text' }
    ).subscribe(data => {
      this.sqlPorter.importSqlToDb(this.storage, data)
        .then(_ => {
          this.getDogs();
          this.isDbReady.next(true);
        })
        .catch(error => console.error(error));
    });
  }

  //Funcion para la obtención del arreglo
  getDogs() {
    return this.storage.executeSql('SELECT * FROM dogstable', []).then(res => {
      let items: Dogs[] = [];
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          items.push({
            id: res.rows.item(i).id,
            breed: res.rows.item(i).breed,
            size: res.rows.item(i).size,
            height: res.rows.item(i).height,
            origin: res.rows.item(i).origin
          });
        }
      }
      this.dogsList.next(items);
    });
  }

  // Funcion para añadir un perro
  addDog(breed, size, height, origin) {
    let data = [breed, size, height, origin];
    return this.storage.executeSql('INSERT INTO dogstable (breed, size, height, origin) VALUES (?, ?, ?, ?)', data)
    .then(res => {
      this.getDogs();
    });
  }

  // Funcion para obtener un perro en base a la id
  getDog(id): Promise<Dogs> {
    return this.storage.executeSql('SELECT * FROM dogstable WHERE id = ?', [id]).then(res => {
      return {
            id: res.rows.item(0).id,
            breed: res.rows.item(0).breed,
            size: res.rows.item(0).size,
            height: res.rows.item(0).height,
            origin: res.rows.item(0).origin
      }
    });
  }

  // Funcion para la edición de los datos de un perro
  updateDog(id, dog: Dogs) {
    let data = [dog.breed, dog.size, dog.height, dog.origin];
    return this.storage.executeSql(`UPDATE dogstable SET breed = ?, size = ?, height = ?, origin = ? WHERE id = ${id}`, data)
    .then(data => {
      this.getDogs();
    })
  }

  // Funcion para borrar un perro
  deleteDog(id) {
    return this.storage.executeSql('DELETE FROM dogstable WHERE id = ?', [id])
    .then(_ => {
      this.getDogs();
    });
  }
}
