import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms";
import { DbService } from './../services/db.service';
import { ToastController } from '@ionic/angular';
import { Router } from "@angular/router";

@Component({
  selector: 'app-db-dogs',
  templateUrl: './db-dogs.page.html',
  styleUrls: ['./db-dogs.page.scss'],
})
export class DbDogsPage implements OnInit {

  //SQLite, forms
  mainForm: FormGroup;
  Data: any[] = []

  constructor(
    //Para el form de SQLite
    private db: DbService,
    public formBuilder: FormBuilder,
    private toast: ToastController,
    private router: Router
  ) { }

  ngOnInit() {
    //Inicializado de base de datos y despliegue de perros
    this.db.dbState().subscribe((res) => {
      if(res) {
        this.db.fetchDogs().subscribe(item => {
          this.Data = item
        })
      }
    });

    this.mainForm = this.formBuilder.group({
      breed: [''],
      size: [''],
      height: [''],
      origin: ['']
    })
  }

  //Funcion para guardar info en la base de datos
  storeData() {
    this.db.addDog(
      this.mainForm.value.breed,
      this.mainForm.value.size,
      this.mainForm.value.height,
      this.mainForm.value.origin
    ).then((res) => {
      this.mainForm.reset();
    })
  }

  //Funcion para borrar perros en base al id
  deleteDog(id) {
    this.db.deleteDog(id).then(async(res) => {
      let toast = await this.toast.create({
        message: 'Dog deleted',
        duration: 2500
      });
      toast.present();
    })
  }

  //Funcion para el boton de back esquina superior izquierda
  getBackButtonText() {
    const win = window as any;
    const mode = win && win.Ionic && win.Ionic.mode;
    return mode === 'ios' ? 'Inbox' : '';
  }

}
