import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookingGuard,PersonalGuard,DateGuard } from 'src/app/core';
import { MainComponent } from './main/main.component';

const routes: Routes = [
  {
    path: '',component: MainComponent,

    children: [
      { path: '', redirectTo:'dates',pathMatch:'full'},
      { path: 'dates', 
       loadChildren: () => import('./index').then(m => m.DatesModule) },
      {
        path: 'personal/:id',
        canActivate: [DateGuard],
        loadChildren: () => import('./index').then(m => m.PersonalModule),
      },
      {
        path:'guests/:id',canActivate:[PersonalGuard],
        loadChildren: () => import('./index').then(m => m.GuestsModule),
      },
      {
        path:'booking/:id',
        canActivate:[BookingGuard],
        loadChildren: () => import('./index').then(m => m.BookingRouterModule),
      },
    ],
  
  },
   
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
