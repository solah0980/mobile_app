import { ShowListTransPageModule } from './../pages/show-list-trans/show-list-trans.module';
import { AddTransPageModule } from './../pages/add-trans/add-trans.module';
import { AddListTransPageModule } from './../pages/add-list-trans/add-list-trans.module';
import { TransactionPageModule } from './../pages/transaction/transaction.module';
import { AddMemberPageModule } from './../pages/add-member/add-member.module';
import { MemberPageModule } from './../pages/member/member.module';
import { TabsPageModule } from './../pages/tabs/tabs.module';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { SQLite } from '@ionic-native/sqlite';
import { Camera } from '@ionic-native/camera';

@NgModule({
  declarations: [
    MyApp,
    HomePage,

  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    TabsPageModule,
    MemberPageModule,
    AddMemberPageModule,
    TransactionPageModule,
    AddListTransPageModule,
    AddTransPageModule,
    ShowListTransPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    SQLite,
    Camera,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },

  ]
})
export class AppModule { }
