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
  token: string = null;

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

          if(resp['status']){
            this.guardarToken(resp['token']);
            resolve(true);
          }else{
            this.token = null;
            this.storage.clear();
            resolve(false);
          }
        }
      );
    });
  }

  logout(){
    this.token = null;
    this.usuario = null;
    this.storage.clear();
    this.navCtrl.navigateRoot('/login', { animated: true });
  }

  async guardarToken(token: string){
    this.token = token;
    await this.storage.set('token', token);
    await this.validaToken();
  }

  async cargarToken(){
    this.token = await this.storage.get('token') || null;
    console.log('cargar token');
    console.log(this.token);
  }

  async validaToken(): Promise<boolean>{
    await this.cargarToken();

    if(!this.token){
      this.navCtrl.navigateRoot('/login');
      return Promise.resolve(false);
    }

    return new Promise<boolean>(resolve => {
      /* const headers = new HttpHeaders({
        'x-token': this.token
      }); */

      const formData = new FormData();
      formData.append('x-token', this.token);

      /* console.log('forms validatoken');
      console.log(formData);

      console.log('headers validatoken');
      console.log(headers); */

      this.http.post(`${ URL }/app_token`, formData).subscribe(
        resp => {
          console.log('from app_token');
          console.log(resp);
          
          if(resp['status']){
            this.usuario = resp['usuario'];
            console.log(this.usuario);
            
            resolve(true);
          }else{
            this.navCtrl.navigateRoot('/login');
            resolve(false);
          }
        }
      );
    });
  }
}
