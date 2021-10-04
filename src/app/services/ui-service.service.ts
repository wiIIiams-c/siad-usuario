import { Injectable } from '@angular/core';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UiServiceService {
  isLoading = false;

  constructor(
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController
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

  async present(){
    this.isLoading = true;

    return await this.loadingCtrl.create({
      message: 'Iniciando Sesion...',
      spinner: 'lines'
    }).then(
      a => {
        a.present().then(
          () => {
            console.log('presented');            
            if(!this.isLoading){
              a.dismiss().then(
                () => console.log('abort presenting')
              );
            }
          }
        );
      }
    );
  }

  async dismiss(){
    this.isLoading = false;

    return await this.loadingCtrl.dismiss().then(
      () => console.log('dismissed')
    );
  }
}
