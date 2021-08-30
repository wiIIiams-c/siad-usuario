import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage-angular';
import { environment } from 'src/environments/environment';
import { Usuario } from '../interfaces/interfaces';
import { NavController } from '@ionic/angular';

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class AccesoService {
  private usuario: Usuario = {};

  constructor(
    private http: HttpClient,
    private storage: Storage,
    private navCtrl: NavController
  ) { }

  login(user: string, password: string){
    //const data = { _user: user, _passwd: password };
    const formData = new FormData();
    formData.append('_user', user);
    formData.append('_passwd', password);
    
    return new Promise(resolve => {
      this.http.post(`${ URL }/app_login`, formData).subscribe(
        async resp => {
          console.log(resp);
        }
      );
    });
  }
}
