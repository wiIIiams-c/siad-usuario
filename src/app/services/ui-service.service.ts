import { Injectable } from '@angular/core';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UiServiceService {
  

  constructor(
    private alertCtrl: AlertController,
    private toastCtrl: ToastController
  ) { }

  async alertaInformativa(message: string){
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      message,
      buttons: ['OK']
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
  }

  async presentToast(message: string){
    const toast = await this.toastCtrl.create({
      message,
      position: 'top',
      duration: 2000
    });

    toast.present();
  }
}
