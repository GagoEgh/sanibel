import { NgModule } from '@angular/core';
import { BookingComponent } from './booking/booking.component';
import { BookingRouterModule } from './booking-router.module';
import { SharedModule } from 'src/app/shared/shared/shared.module';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [
    BookingComponent
  ],
  imports: [
    SharedModule,
    BookingRouterModule,
 
  ]
})
export class BookingModule { }
