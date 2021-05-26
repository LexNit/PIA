import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms";
import { DbService } from './../services/db.service';
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-addogs',
  templateUrl: './addogs.page.html',
  styleUrls: ['./addogs.page.scss'],
})
export class AddogsPage implements OnInit {

  editForm: FormGroup;
  id: any;

  constructor(
    //Para el form de SQLite
    private db: DbService,
    private router: Router,
    public formBuilder: FormBuilder,
    private actRoute: ActivatedRoute
  ) {
    this.id = this.actRoute.snapshot.paramMap.get('id');

    this.db.getDog(this.id).then(res => {
      this.editForm.setValue({
        breed: res['breed'] ,
        size: res['size'] ,
        height: res['height'],
        origin: res['origin']
      })
    })
  }

  ngOnInit() {
    this.editForm = this.formBuilder.group({
      breed: [''],
      size: [''],
      height: [''],
      origin: ['']
    })
  }

  saveForm() {
    this.db.updateDog(this.id, this.editForm.value)
    .then((res) => {
      console.log(res)
      this.router.navigate(['/db-dogs']);
    })
  }

  getBackButtonText() {
    const win = window as any;
    const mode = win && win.Ionic && win.Ionic.mode;
    return mode === 'ios' ? 'Inbox' : '';
  }
}
