import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddTransPage } from './add-trans';

@NgModule({
  declarations: [
    AddTransPage,
  ],
  imports: [
    IonicPageModule.forChild(AddTransPage),
  ],
})
export class AddTransPageModule {}
