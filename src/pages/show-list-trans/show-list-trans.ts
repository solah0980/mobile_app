import { AddListTransPage } from './../add-list-trans/add-list-trans';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

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
  constructor(public navCtrl: NavController, public navParams: NavParams, public sqlite: SQLite,public platform: Platform) {
    this.id = this.navParams.get('id')
    this.status = this.navParams.get('status')
    this.platform.ready()
      .then(() => {
        this.sqlite.create({
          name: 'data.db',
          location: 'default'
        })
          .then(function(db: SQLiteObject) {
            db.executeSql("create table IF NOT EXISTS list_trans(id INTEGER PRIMARY KEY AUTOINCREMENT,id_trans INTEGER,id_member INTEGER,money INTEGER,list_name varchar(50))", [])
              .then(function(data) {
                console.log("create table success")
              })
              .catch(e => console.log(JSON.stringify(e)));

          })
          .catch(e => console.log(JSON.stringify(e)));
    })

  }
  ionViewDidEnter() {
    let query: any;
    console.log(this.id)
    if (this.status == 'ฝาก') {
      query = `SELECT *, users.name FROM list_trans INNER JOIN users ON users.id = list_trans.id_member WHERE id_trans = ? `;
    } else {
      query = 'SELECT * FROM list_trans WHERE id_trans = ? ';
    }
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
}
