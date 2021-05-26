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

  dbState() {
    return this.isDbReady.asObservable();
  }

  fetchDogs(): Observable<Dogs[]> {
    return this.dogsList.asObservable();
  }

  // Render fake data
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

  // Get list
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

  // Add
  addDog(breed, size, height, origin) {
    let data = [breed, size, height, origin];
    return this.storage.executeSql('INSERT INTO dogstable (breed, size, height, origin) VALUES (?, ?, ?, ?)', data)
    .then(res => {
      this.getDogs();
    });
  }

  // Get single object
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

  // Update
  updateDog(id, dog: Dogs) {
    let data = [dog.breed, dog.size, dog.height, dog.origin];
    return this.storage.executeSql(`UPDATE dogstable SET breed = ?, size = ?, height = ?, origin = ? WHERE id = ${id}`, data)
    .then(data => {
      this.getDogs();
    })
  }

  // Delete
  deleteDog(id) {
    return this.storage.executeSql('DELETE FROM dogstable WHERE id = ?', [id])
    .then(_ => {
      this.getDogs();
    });
  }
}
