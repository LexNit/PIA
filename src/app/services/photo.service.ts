import { Injectable } from '@angular/core';
import {
  Plugins,
  CameraResultType,
  Capacitor,
  FilesystemDirectory,
  CameraPhoto,
  CameraSource
} from '@capacitor/core';

//referencias a los plugins para poner en marcha la camara
const { Camera, Filesystem, Storage } = Plugins;

@Injectable({
  providedIn: 'root'
})

export class PhotoService {

  //Arreglo para las referencias a las fotos
  public photos: Photo[] = [];
  //Variable clave para identificar el almacenamiento de las fotos
  private PHOTO_STORAGE: string = "photos";

  constructor() { }

  //Proceso para tomar una foto y guardarla
  public async addNewToGallery() {
    //getPhoto, propio de Capacitor, permitirá abrir la camara en cualquier dispositivo 
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Uri, //modifica el tipo de dato para mejorar desempeño
      source: CameraSource.Camera,      //toma una foto con la camara 
      quality: 100                      //la mas alta calidad (0-100)
    });

    /*agregamos la foto capturada al inicio del arrelgo
    this.photos.unshift({
      filepath: "soon...",
      webviewPath: capturedPhoto.webPath
    });*/

    const savedImageFile = await this.savePicture(capturedPhoto);
    this.photos.unshift(savedImageFile);

    //Funcion para guardar el arreglo en sistema cada que se tome una nueva foto
    Storage.set({
      key: this.PHOTO_STORAGE,
      value: JSON.stringify(this.photos)
    });

  }

  //***** Función para poder regresar la imagen, guardarla y tener que mostrar
  private async savePicture(cameraPhoto: CameraPhoto) {
    //Conversión a base64 requerida para que la api Filesystem guarde la imagen 
    const base64Data = await this.readAsBase64(cameraPhoto);

    //Escribe los datos de la foto en el directorio del sistema
    const fileName = new Date().getTime() + '.jpeg';
    const savedFile = await Filesystem.writeFile({
      path: fileName,
      data: base64Data,
      directory: FilesystemDirectory.Data
    });

    //Usa el webPath para cargar la imagen una vez que ya se ha cargado en la memoria
    return {
      filepath: fileName,
      webviewPath: cameraPhoto.webPath
    };
  }

  //******Función lógica para convertir la iamgen a base 64 usando la API
  private async readAsBase64(cameraPhoto: CameraPhoto) {
    // Fetch the photo, read as a blob, then convert to base64 format Llamada fetch para la foto, leer como blob y convertir a base64
    const response = await fetch(cameraPhoto.webPath!);
    const blob = await response.blob();

    return await this.convertBlobToBase64(blob) as string;
  }

  convertBlobToBase64 = (blob: Blob) => new Promise((resolve, reject) => {
    const reader = new FileReader;
    reader.onerror = reject;
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.readAsDataURL(blob);
  });

  //*******Funcion en cargada de cargar el arreglo de fotos guardado
  public async loadSaved() {
    //Recarga el arreglo guardado
    const photoList = await Storage.get({ key: this.PHOTO_STORAGE });
    this.photos = JSON.parse(photoList.value) || [];

    //Muestra la foto leyendo en base64
    for (let photo of this.photos) {
      // Lectura de cada foto por individual
      const readFile = await Filesystem.readFile({
        path: photo.filepath,
        directory: FilesystemDirectory.Data
      });

      // (Solo para plataforma web) Carga la foto como base64
      photo.webviewPath = `data:image/jpeg;base64,${readFile.data}`;
    }

  }
}

//Interfaz para retener la info de la foto tomada
export interface Photo {
  filepath: string;
  webviewPath: string;
}
