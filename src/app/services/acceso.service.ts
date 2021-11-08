import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Usuario } from '../interfaces/interfaces';
import { NavController } from '@ionic/angular';
import { StorageServiceService } from './storage-service.service';

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class AccesoService {
  private usuario: Usuario = {};
  token: string = null;

  constructor(
    private http: HttpClient,
    private navCtrl: NavController,
    private storageService: StorageServiceService
  ) { }

  login(user: string, password: string){
    const formData = new FormData();
    formData.append('_user', user);
    formData.append('_passwd', password);
    
    return new Promise(resolve => {
      this.http.post(`${ URL }/app_login`, formData).subscribe(
        async resp => {
          if(resp['status']){
            await this.guardarToken(resp['token']);
            resolve(true);
          }else{
            this.token = null;
            //this.storageService.clear();
            this.storageService.remove('token');
            resolve(false);
          }
        }
      );
    });
  }

  logout(){
    this.token = null;
    this.usuario = <Usuario>{};
    this.storageService.clear();
    this.navCtrl.navigateRoot('/login', { animated: true });
  }

  async getUsuario(){
    if(!this.usuario.id){
      await this.validaToken();
    }

    return {...this.usuario};
  }

  async guardarToken(token: string){
    this.token = token;
    this.storageService.set('token', token);
    await this.validaToken();
  }

  async cargarToken(){
    this.token = await this.storageService.get('token') || null;
  }

  async validaToken(): Promise<boolean>{
    await this.cargarToken();
    
    if(!this.token){
      this.navCtrl.navigateRoot('/login');
      return Promise.resolve(false);
    }

    return new Promise<boolean>(resolve => {
      const headers = new HttpHeaders({
        'x-token': this.token
      });

      this.http.get(`${ URL }/app_token`, { headers }).subscribe(
        resp => {
          if(resp['status']){
            this.usuario = resp['usuario'];
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
