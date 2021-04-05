import { AddListTransPage } from './../add-list-trans/add-list-trans';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { ToastController } from 'ionic-angular';

/**
 * Generated class for the ShowListTransPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-show-list-trans',
  templateUrl: 'show-list-trans.html',
})
export class ShowListTransPage {
  id: any;
  status: any;
  data: any[] = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, public sqlite: SQLite,public platform: Platform, public toastCtrl: ToastController) {
    this.id = this.navParams.get('id')
    this.status = this.navParams.get('status')

  }
  ionViewDidEnter() {
    let query: any;
    console.log(this.id)
    if (this.status == 'ฝาก') {
      query = `SELECT *, users.name FROM list_trans INNER JOIN users ON users.id = list_trans.id_member WHERE id_trans = ? `;
    } else {
      query = 'SELECT * FROM list_trans WHERE id_trans = ? ';
    }
    console.log(query)
    this.data=[]
    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {
        db.executeSql(query, [this.id])
          .then((data) => {
            for (var i = 0; i < data.rows.length; i++){
              let d = {
                id: data.rows.item(i).id,
                id_trans: data.rows.item(i).id_trans,
                id_member: data.rows.item(i).id_member,
                money: data.rows.item(i).money,
                name: data.rows.item(i).name,
                list_name:data.rows.item(i).list_name
              }
              console.log(JSON.stringify(data.rows.item(i)))
              this.data.push(d)
            }
          })
          .catch(e => console.log(JSON.stringify(e)));

      })
      .catch(e => console.log(e));
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ShowListTransPage');
    /* this.createTable() */
  }
  addList() {
    this.navCtrl.push(AddListTransPage, {
      id: this.id,
      status: this.status
    })
  }

  deleteItem(id) {
    console.log(id)
    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {
        db.executeSql('DELETE FROM list_trans WHERE id = ? ', [id])
          .then(() => {
            const toast = this.toastCtrl.create({
              message: 'ลบข้อมูลสำเร็จ',
              duration: 3000
            });
            toast.present();
          }).then(() => {
            this.ionViewDidEnter()
          })
              .catch(e => console.log(JSON.stringify(e)));
      })
    .catch (e => console.log(e));
  }
}
