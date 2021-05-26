import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DbDogsPage } from './db-dogs.page';

const routes: Routes = [
  {
    path: '',
    component: DbDogsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DbDogsPageRoutingModule {}
