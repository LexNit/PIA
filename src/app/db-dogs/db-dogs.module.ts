import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DbDogsPageRoutingModule } from './db-dogs-routing.module';

import { DbDogsPage } from './db-dogs.page';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    DbDogsPageRoutingModule
  ],
  declarations: [DbDogsPage]
})
export class DbDogsPageModule {}
