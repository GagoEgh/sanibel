import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DateGuard } from 'src/app/core/guards/date.guard';
import { PersonalGuard } from 'src/app/core/guards/personal.guard';
import { MainComponent } from './main/main.component';

const routes: Routes = [
  {
    path: '', component: MainComponent,

    children: [
      { path: '', redirectTo:'dates',pathMatch:'full'},
      { path: 'dates', 
       loadChildren: () => import('./index').then(m => m.DatesModule) },
      {
        path: 'personal',
        canActivate: [DateGuard],
        loadChildren: () => import('./index').then(m => m.PersonalModule),
      },
      {
        path:'guests',canActivate:[PersonalGuard],
        loadChildren: () => import('./index').then(m => m.GuestsModule),
      }
    ],

  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
