import { NgModule } from '@angular/core';
import { PersonalComponent } from './personal/personal.component';
import { PersonalRouterModule } from './personal-router.module';
import { SharedModule } from 'src/app/shared/shared/shared.module';



@NgModule({
  declarations: [
    PersonalComponent
  ],
  imports: [
    PersonalRouterModule,
    SharedModule
  ]
})
export class PersonalModule { }
