import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,Platform } from 'ionic-angular';
import { SQLite, SQLiteObject} from '@ionic-native/sqlite';
import { ToastController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
/**
 * Generated class for the EditMemberPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-member',
  templateUrl: 'edit-member.html',
})
export class EditMemberPage {
  user: any = {};
  profile: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public sqlite: SQLite, public platform: Platform
    , public toastCtrl: ToastController, private camera: Camera) {
      this.user.id = this.navParams.get('id')
    this.user.name = this.navParams.get('name')
    this.user.phone = this.navParams.get('phone')
    this.user.sex = this.navParams.get('sex')
    this.profile = this.navParams.get('profile')
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditMemberPage');
  }

  editMember() {
    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {
        db.executeSql('UPDATE users SET name=?,profile=?,phone=?,sex=? WHERE id = ? ', [this.user.name,this.profile,this.user.phone,this.user.sex,this.user.id])
          .then(() => {
            const toast = this.toastCtrl.create({
              message: 'แก้ไขข้อมูลสำเร็จ',
              duration: 3000
            });
            toast.present();
          }).then(() => {
            this.navCtrl.pop()
          })
              .catch(e => console.log("insert error"));
      })
    .catch (e => console.log(e));
  }

  takePhoto() {
    const options: CameraOptions = {
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.CAMERA,
      encodingType: this.camera.EncodingType.JPEG,
      targetHeight: 600,
      targetWidth: 600,
      saveToPhotoAlbum: false,
      correctOrientation:true


    }
    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      this.profile = 'data:image/jpeg;base64,'+imageData
     /*  console.log(this.profile) */
     }, (err) => {
      // Handle error
     });
  }

  deleteMember() {
    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {
        db.executeSql('DELETE FROM users WHERE id = ? ', [this.user.id])
          .then(() => {
            const toast = this.toastCtrl.create({
              message: 'ลบข้อมูลสำเร็จ',
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
