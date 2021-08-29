import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IonSlides, NavController } from '@ionic/angular';
import { AccesoService } from 'src/app/services/acceso.service';
import { Storage } from '@ionic/storage-angular';
import { UiServiceService } from 'src/app/services/ui-service.service';
import { Usuario } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  @ViewChild('slidePrincipal') slides: IonSlides;
  
  loginUser = {
    email: 'usuario4@usuario.cl',
    password: '123456'
  }

  constructor(
    private accesoService: AccesoService,
    private storage: Storage,
    private navCtrl: NavController,
    private uiService: UiServiceService
  ) { }

  async ngOnInit() {
    await this.storage.create();
  }

  ionViewDidEnter(){
    this.slides.lockSwipes(true);
  }

  async login(fLogin: NgForm){
    if(fLogin.invalid){ return; }

    //const valido = await this.accesoService
  }
}
