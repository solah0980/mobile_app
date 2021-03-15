import { ShowListTransPage } from './../show-list-trans/show-list-trans';
import { AddTransPage } from './../add-trans/add-trans';

import { Component } from '@angular/core';

import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

/**
 * Generated class for the TransactionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-transaction',
  templateUrl: 'transaction.html',
})
export class TransactionPage {
  transactions: any[] = [];
  choose: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public sqlite: SQLite, public platform: Platform) {

  }
  ionViewWillEnter() {
    this.transactions=[]
    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {
        db.executeSql("SELECT * FROM transactions ORDER BY id DESC", [],)
          .then((data) => {
            for (var i = 0; i < data.rows.length; i++){
              let d = {
                id: data.rows.item(i).id,
                status: data.rows.item(i).status,
                date: data.rows.item(i).date,
              }
              this.transactions.push(d)
            }
          })
          .catch(e => console.log("error select table"));

      })
      .catch(e => console.log(e));
  }
  onChange() {
    this.transactions=[]
    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {
        let query: any;
        if (this.choose == "ฝาก") {
          query = "SELECT * FROM transactions WHERE status = 'ฝาก' ORDER BY id DESC";
        } else if (this.choose == "ถอน") {
          query = "SELECT * FROM transactions WHERE status = 'ถอน' ORDER BY id DESC";
        } else {
          query = "SELECT * FROM transactions ORDER BY id DESC";
        }
        console.log(query)
        db.executeSql(query, [],)
          .then((data) => {
            for (var i = 0; i < data.rows.length; i++){
              let d = {
                id: data.rows.item(i).id,
                status: data.rows.item(i).status,
                date: data.rows.item(i).date,
              }
              this.transactions.push(d)
            }
          })
          .catch(e => console.log("error select table"));

      })
      .catch(e => console.log(e));
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad TransactionPage');
  }

  openList() {
    this.navCtrl.push(AddTransPage)
  }

  showTrans(id,status) {
    this.navCtrl.push(ShowListTransPage, {
      id: id,
      status: status
    })
  }
}
