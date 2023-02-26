import { NgModule } from '@angular/core';
import { GuestsComponent } from './guests/guests.component';
import { GuestRoutingModule } from './guest-routing.module';
import { SharedModule } from 'src/app/shared/shared/shared.module';
import { GuestComponent } from './guest/guest.component';



@NgModule({
  declarations: [
    GuestsComponent,
    GuestComponent
  ],
  imports: [
    GuestRoutingModule,
    SharedModule
  ]
})
export class GuestsModule { }
