import { NgModule } from '@angular/core';
import { GuestsComponent } from './guests/guests.component';
import { GuestRoutingModule } from './guest-routing.module';
import { SharedModule } from 'src/app/shared/shared/shared.module';



@NgModule({
  declarations: [
    GuestsComponent
  ],
  imports: [
    GuestRoutingModule,
    SharedModule
  ]
})
export class GuestsModule { }
