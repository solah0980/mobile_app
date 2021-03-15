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
              /* console.log(data.rows.item(i).id) */
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

}
