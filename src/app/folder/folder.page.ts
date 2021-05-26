import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Dogmodel } from 'src/app/Dogmodel';
import { NavController, ToastController } from '@ionic/angular';
import { CameraPage } from '../camera/camera.page';

// Para SQLite y su forms
// import { FormGroup, FormBuilder } from "@angular/forms";
// import { DbService } from './../services/db.service';
// import { ToastController } from '@ionic/angular';
// import { Router } from "@angular/router";

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})

export class FolderPage implements OnInit {

  //Cat's facts, API
  public folder: string;
  facts: any = [];
  private url_facts = 'https://cat-fact.herokuapp.com/facts';

  //Dog Image, API
  url:string;
  myApiResponseData: Dogmodel.DogImage;
  processing:boolean;

  constructor(
    private activatedRoute: ActivatedRoute,
    private http: HttpClient,
    private navCtrl: NavController,
    ) { }


  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id');
    this.url='https://dog.ceo/api/breeds/image/random';
    this.myApiResponseData = <Dogmodel.DogImage>{};
    this.processing=false;
  }

  callApi()
  {
    this.processing = true;
    fetch(this.url)
    .then(response => response.json())
    .then((data:Dogmodel.DogImage)=>{
      this.myApiResponseData = data;
      this.processing = false;
    })
  }

  showDog()
  {

  }

  getAllFacts() {
    this.http.get(this.url_facts)
    .subscribe( f => {
      console.log(f);
      this.facts = f;
    });
  }

  gotocamera(){
    this.navCtrl.navigateForward('CameraPage');
  }
}
