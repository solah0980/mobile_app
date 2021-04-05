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
    this.platform.ready()
      .then(() => {
        this.sqlite.create({
          name: 'data.db',
          location: 'default'
        })
          .then((db: SQLiteObject) => {
            db.executeSql("CREATE TABLE list_trans (id INTEGER PRIMARY KEY AUTOINCREMENT,id_trans INTEGER,id_member INTEGER, money INTEGER, list_name varchar(50))", [],)
              .then((data) => {
                console.log("create table list _trans success")
              })
              .catch(e => console.log(JSON.stringify(e)));

          })
          .catch(e => console.log(e));
    })
  }
  ionViewWillEnter() {

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
          query = "SELECT transactions.id, transactions.status, transactions.date, SUM(list_trans.money) as money, COUNT(list_trans.id) as count  FROM transactions LEFT JOIN list_trans ON list_trans.id_trans = transactions.id WHERE status = 'ฝาก' GROUP BY transactions.id, transactions.status, transactions.date ORDER BY transactions.id DESC";
        } else if (this.choose == "ถอน") {
          query = "SELECT transactions.id, transactions.status, transactions.date, SUM(list_trans.money) as money, COUNT(list_trans.id) as count  FROM transactions LEFT JOIN list_trans ON list_trans.id_trans = transactions.id WHERE status = 'ถอน' GROUP BY transactions.id, transactions.status, transactions.date ORDER BY transactions.id DESC";
        } else if (this.choose == "all"){
          query = "SELECT transactions.id, transactions.status, transactions.date, SUM(list_trans.money) as money, COUNT(list_trans.id) as count  FROM transactions LEFT JOIN list_trans ON list_trans.id_trans = transactions.id GROUP BY transactions.id, transactions.status, transactions.date ORDER BY transactions.id DESC";
        }
        /* console.log(query) */
        db.executeSql(query, [],)
          .then((data) => {
            for (var i = 0; i < data.rows.length; i++){
              let d = {
                id: data.rows.item(i).id,
                status: data.rows.item(i).status,
                date: data.rows.item(i).date,
                money: data.rows.item(i).money,
                count: data.rows.item(i).count

              }
              console.log(data.rows.item(i).id)
              this.transactions.push(d)
            }
          })
          .catch(e => console.log(JSON.stringify(e)));

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

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);

    setTimeout(() => {
      this.transactions=[]
      this.sqlite.create({
        name: 'data.db',
        location: 'default'
      })
        .then((db: SQLiteObject) => {
          db.executeSql('SELECT transactions.id, transactions.status, transactions.date, SUM(list_trans.money) as money, COUNT(list_trans.id) as count  FROM transactions LEFT JOIN list_trans ON list_trans.id_trans = transactions.id GROUP BY transactions.id, transactions.status, transactions.date ORDER BY transactions.id DESC', [],)
            .then((data) => {
              for (var i = 0; i < data.rows.length; i++){
                let d = {
                  id: data.rows.item(i).id,
                  status: data.rows.item(i).status,
                  date: data.rows.item(i).date,
                  money: data.rows.item(i).money,
                  count: data.rows.item(i).count

                }
                /* console.log(data.rows.item(i).sex) */
                this.transactions.push(d)
              }
            }).then(()=>refresher.complete())
            .catch(e => console.log(JSON.stringify(e)));

        })
        .catch(e => console.log(e));
    }, 1000);
  }
}
