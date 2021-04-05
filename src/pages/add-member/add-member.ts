import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,Platform } from 'ionic-angular';
import { SQLite, SQLiteObject} from '@ionic-native/sqlite';
import { ToastController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
/**
 * Generated class for the AddMemberPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-member',
  templateUrl: 'add-member.html',
})
export class AddMemberPage {
  user: any = {};
  profile: any;
   constructor(public navCtrl: NavController, public navParams: NavParams, public sqlite: SQLite, public platform: Platform
  ,public toastCtrl: ToastController,private camera: Camera,) {
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

  addMember() {
    /* console.log(this.user.name,'',this.user.phone,this.user.sex) */
    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {
        db.executeSql('INSERT INTO users(name,profile,phone,sex) VALUES(?,?,?,?) ', [this.user.name,this.profile,this.user.phone,this.user.sex])
          .then(() => {
            const toast = this.toastCtrl.create({
              message: 'เพิ่มข้อมูลสมาชิกในห้องสำเร็จ',
              duration: 3000
            });
            toast.present();
            console.log('insert success')
          }).then(() => {
            this.navCtrl.pop()
          })
              .catch(e => console.log("insert error"));
      })
    .catch (e => console.log(e));
  }

}
