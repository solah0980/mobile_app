import { TransactionPage } from './../transaction/transaction';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,Platform } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { ToastController } from 'ionic-angular';
/**
 * Generated class for the AddListTransPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-list-trans',
  templateUrl: 'add-list-trans.html',
})
export class AddListTransPage {
  id: any;
  status: any;
  users: any[] = [];
  data: any = {};
  query: any;
  queryData: any[] = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, public sqlite: SQLite, public platform: Platform,
    public toastCtrl: ToastController) {
    this.id = this.navParams.get('id');
    this.status = this.navParams.get('status');
    if (this.status == 'ฝาก') {
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
  }
  ionViewWillEnter() {
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad AddListTransPage');
  }

  addItem() {
    this.data.id_trans=this.id
    console.log(this.data.money, this.data.id_trans,this.data.list_name)
    console.log(this.data.list_name)
    if (this.users.length != 0) {
      console.log("Add item")
      this.query = 'INSERT INTO list_trans(id_trans,id_member,money) VALUES(?,?,?)';
      this.queryData=[this.data.id_trans,this.data.id_member,this.data.money]
    } else {
      console.log("Add item 2")
      this.query = 'INSERT INTO list_trans(id_trans,money,list_name) VALUES(?,?,?)';
      this.queryData = [this.data.id_trans,this.data.money,this.data.list_name]
    }
    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {
        db.executeSql(this.query, this.queryData)
          .then((data) => {
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
