import { NgModule } from '@angular/core';
import { DatesComponent } from './dates/dates.component';
import { DatesRoutingModule } from './dates-routing.module';
import { SharedModule } from 'src/app/shared/shared/shared.module';



@NgModule({
  declarations: [
    DatesComponent
  ],
  imports: [
    DatesRoutingModule,
    SharedModule
  ]
})
export class DatesModule { }
