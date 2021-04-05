import { EditMemberPage } from './../edit-member/edit-member';
import { AddMemberPage } from './../add-member/add-member';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

/**
 * Generated class for the MemberPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-member',
  templateUrl: 'member.html',
})
export class MemberPage {
  users: any[] = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, public sqlite: SQLite, public platform: Platform,) {
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

  ionViewWillEnter() {
    this.users=[]
    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {
        db.executeSql('SELECT * FROM users', [],)
          .then((data) => {
            for (var i = 0; i < data.rows.length; i++){
              let d = {
                id: data.rows.item(i).id,
                name: data.rows.item(i).name,
                profile: data.rows.item(i).profile,
                phone: data.rows.item(i).phone,
                sex: data.rows.item(i).sex
              }
              console.log(data.rows.item(i).profile)
              this.users.push(d)
            }
          })
          .catch(e => console.log("error select table"));

      })
      .catch(e => console.log(e));
  }


  addMemberPage() {
    this.navCtrl.push(AddMemberPage)
  }

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);

    setTimeout(() => {
      this.users=[]
      this.sqlite.create({
        name: 'data.db',
        location: 'default'
      })
        .then((db: SQLiteObject) => {
          db.executeSql('SELECT * FROM users', [],)
            .then((data) => {
              for (var i = 0; i < data.rows.length; i++){
                let d = {
                  id: data.rows.item(i).id,
                  name: data.rows.item(i).name,
                  profile: data.rows.item(i).profile,
                  phone: data.rows.item(i).phone,
                  sex: data.rows.item(i).sex
                }
                /* console.log(data.rows.item(i).sex) */
                this.users.push(d)
              }
            }).then(()=>refresher.complete())
            .catch(e => console.log("error select table"));

        })
        .catch(e => console.log(e));
    }, 2000);
  }

  goToEdit(name,phone,profile,sex,id) {
    this.navCtrl.push(EditMemberPage, {
      id:id,
      name: name,
      phone: phone,
      profile: profile,
      sex:sex
    })
  }
}
