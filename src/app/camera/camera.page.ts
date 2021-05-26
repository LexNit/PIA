import { Component, OnInit } from '@angular/core';
import { PhotoService } from '../services/photo.service';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.page.html',
  styleUrls: ['./camera.page.scss'],
})


export class CameraPage implements OnInit {

  constructor(public photoService: PhotoService) { }

  //Fucncion para inicializar la camara
  async ngOnInit() {
    await this.photoService.loadSaved();
  }

  //Funcion para agregar foto a la galeria
  addPhotoToGallery() {
    this.photoService.addNewToGallery();
  }

  //Funcion para el boton de back esquina superior izquierda
  getBackButtonText() {
    const win = window as any;
    const mode = win && win.Ionic && win.Ionic.mode;
    return mode === 'ios' ? 'Inbox' : '';
  }

}
