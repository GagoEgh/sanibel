import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './views/main/main/main.component';


const routes: Routes = [
  // { path: '' ,component: MainComponent,pathMatch:'full' },
  {
    path: 'main',
    loadChildren: () => import('./views/index').then(m => m.MainModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
