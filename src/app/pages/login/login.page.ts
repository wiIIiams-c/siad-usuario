import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IonSlides, NavController } from '@ionic/angular';
import { AccesoService } from 'src/app/services/acceso.service';
import { UiServiceService } from 'src/app/services/ui-service.service';
import { Usuario } from 'src/app/interfaces/interfaces';
import { LoadingServiceService } from 'src/app/services/loading-service.service';
import { StorageServiceService } from 'src/app/services/storage-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  @ViewChild('slidePrincipal') slides: IonSlides;
  
  loginUser = {
    user: '',
    password: ''
  }

  constructor(
    private accesoService: AccesoService,
    private navCtrl: NavController,
    private uiService: UiServiceService,
    private loadingService: LoadingServiceService,
    private storageService: StorageServiceService
  ) { }

  async ngOnInit() {
    await this.storageService.init();
  }

  ionViewDidEnter(){
    this.slides.lockSwipes(true);
  }

  async login(fLogin: NgForm){
    if(fLogin.invalid){ return; }

    const valido = await this.accesoService.login(this.loginUser.user, this.loginUser.password);

    await this.loadingService.present('Iniciando...');

    if(valido){
      this.navCtrl.navigateRoot('/main/tabs/tab2', { animated: true });
    }else{
      this.loadingService.dismiss();
      this.uiService.presentToast('Datos Login Incorrectos');
    }
  }
}
