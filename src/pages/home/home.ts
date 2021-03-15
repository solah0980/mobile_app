
import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { SQLite, SQLiteObject} from '@ionic-native/sqlite';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController,public sqlite: SQLite,public platform:Platform ) {
    this.platform.ready()
      .then(() => {
        this.sqlite.create({
          name: 'data.db',
          location: 'default'
        })
          .then((db: SQLiteObject) => {


            db.executeSql('create table IF NOT EXISTS users(id INTEGER PRIMARY KEY AUTOINCREMENT,name varchar(50),profile varchar(255),phone varchar(10),sex varchar(10))', [])
            .then(() => {
                console.log('create table users success')
              })
              .catch(e => console.log("error create table"));

          })
          .catch(e => console.log(e));
    })
  }

}
