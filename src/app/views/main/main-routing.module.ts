import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DateGuard } from 'src/app/core/guards/date.guard';
import { MainComponent } from './main/main.component';

const routes: Routes = [
  {
    path: '', component: MainComponent,
    children:[
      {path:'dates',loadChildren: () => import('./index').then(m=>m.DatesModule)},
      {
        path:'personal',
        canActivate:[DateGuard],
        loadChildren: () => import('./index').then(m=>m.PersonalModule),
      },
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
