import { AddListTransPage } from './../add-list-trans/add-list-trans';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,Platform } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { ToastController } from 'ionic-angular';
/**
 * Generated class for the AddTransPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-trans',
  templateUrl: 'add-trans.html',
})
export class AddTransPage {
  id: any;
  data: any = {};
  monthNames: string[];

  nbDate: number;
  nbMonth: number;
  stMonth: string;
  nbYear: number;
  constructor(public navCtrl: NavController, public navParams: NavParams, public sqlite: SQLite, public toastCtrl: ToastController,
    public platform:Platform) {
    this.platform.ready()
      .then(() => {
        this.sqlite.create({
          name: 'data.db',
          location: 'default'
        })
          .then((db: SQLiteObject) => {


            db.executeSql('create table IF NOT EXISTS transactions(id INTEGER PRIMARY KEY AUTOINCREMENT,status varchar(50),date varchar(255))', [])
              .then(() => {
                console.log('create table transactions success')
              })
              .catch(e => console.log(JSON.stringify(e)));

          })
          .catch(e => console.log(e));
    })
  }

  ionViewDidEnter() {
    let date = new Date();
    this.monthNames = ['มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน', 'กรกฏาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'];
    this.nbDate = date.getDate();
    this.nbMonth = date.getMonth() + 1;
    this.stMonth = this.monthNames[date.getMonth()];
    this.nbYear = date.getFullYear();
    this.data.date = this.nbDate + " " + this.stMonth + " "+this.nbYear;
    console.log(this.data.date);
  }

  addTrans() {
    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {
        db.executeSql('INSERT INTO transactions(status,date) VALUES(?,?) ', [this.data.status,this.data.date])
          .then((data) => {
            this.id = data.insertId
            console.log(JSON.stringify(data))
            const toast = this.toastCtrl.create({
              message: 'เพิ่มข้อมูลรายการสำเร็จ',
              duration: 3000
            });
            toast.present();
          }).then(() => {
            this.navCtrl.pop()
          })
              .catch(e => console.log(JSON.stringify(e)));
      })
    .catch (e => console.log(e));
  }

}
