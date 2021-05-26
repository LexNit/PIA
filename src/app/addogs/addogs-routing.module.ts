import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddogsPage } from './addogs.page';

const routes: Routes = [
  {
    path: '',
    component: AddogsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddogsPageRoutingModule {}
