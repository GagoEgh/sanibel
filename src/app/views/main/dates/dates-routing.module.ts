import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DatesComponent } from './dates/dates.component';

const routes: Routes = [
  {
    path: '', component: DatesComponent,
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DatesRoutingModule { }
