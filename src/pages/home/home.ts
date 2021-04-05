
import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { SQLite, SQLiteObject} from '@ionic-native/sqlite';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  data: any[] = [];
  constructor(public navCtrl: NavController,public sqlite: SQLite,public platform:Platform ) {
    /* this.platform.ready()
    .then(() => {
      this.sqlite.create({
        name: 'data.db',
        location: 'default'
      })
        .then(function(db: SQLiteObject) {
          db.executeSql("SELECT transactions.id, transactions.status, transactions.date, SUM(list_trans.money) as money, COUNT(list_trans.id) as list_count FROM transactions LEFT JOIN list_trans ON list_trans.id_trans = transactions.id GROUP BY transactions.status ORDER BY transactions.status DESC", [])
            .then(function(data) {
              console.log("create table success")
            })
            .catch(e => console.log(JSON.stringify(e)));

        })
        .catch(e => console.log(JSON.stringify(e)));
  }) */
  }

  ionViewWillEnter() {
    /* this.data=[]
      this.sqlite.create({
        name: 'data.db',
        location: 'default'
      })
        .then((db: SQLiteObject) => {
          db.executeSql('SELECT transactions.id, transactions.status, transactions.date, SUM(list_trans.money) as money, COUNT(list_trans.id) as list_count FROM transactions LEFT JOIN list_trans ON list_trans.id_trans = transactions.id GROUP BY transactions.status', [],)
            .then((data) => {
              for (var i = 0; i < data.rows.length; i++){
                let d = {
                  status: data.rows.item(i).status,
                  money: data.rows.item(i).money,

                }
                console.log(data.rows.item(i).status)
                this.data.push(d)
                console.log(JSON.stringify(this.data))
              }
            })
        })
        .catch(e => console.log(e)); */
  }

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);

    setTimeout(() => {
      this.data=[]
      this.sqlite.create({
        name: 'data.db',
        location: 'default'
      })
        .then((db: SQLiteObject) => {
          db.executeSql('SELECT transactions.id, transactions.status, transactions.date, SUM(list_trans.money) as money, COUNT(list_trans.id) as list_count FROM transactions LEFT JOIN list_trans ON list_trans.id_trans = transactions.id GROUP BY transactions.status', [],)
            .then((data) => {
              for (var i = 0; i < data.rows.length; i++){
                let d = {
                  status: data.rows.item(i).status,
                  money: data.rows.item(i).money,

                }
                /* console.log(data.rows.item(i).money) */
                this.data.push(d)
                console.log(this.data[0].money)
              }
            }).then(()=>refresher.complete())
            .catch(e => console.log("error select table"));

        })
        .catch(e => console.log(e));
    }, 1000);
  }
}
