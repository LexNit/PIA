import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddogsPageRoutingModule } from './addogs-routing.module';

import { AddogsPage } from './addogs.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    AddogsPageRoutingModule
  ],
  declarations: [AddogsPage]
})
export class AddogsPageModule {}
