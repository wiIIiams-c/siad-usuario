import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { RespuestaUsuarios, Usuario } from '../interfaces/interfaces';
import { AccesoService } from './acceso.service';
import { async } from '@angular/core/testing';

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  paginaUsuario = 0;

  constructor(
    private http: HttpClient,
    private accesoService: AccesoService
  ) { }

  getUsuarios(pull: boolean = false){
    if(pull){
      this.paginaUsuario = 0;
    }

    this.paginaUsuario++;

    return this.http.get<RespuestaUsuarios>(`${ URL }/app_users/${ this.paginaUsuario }`);
    //return this.http.get<RespuestaUsuarios>(`${ URL }/app_users`);
  }

  buscarUsuarios(buscar: string){
    return this.http.get<RespuestaUsuarios>(`${ URL }/app_busca/${ buscar }`);
  }

  actualizaUsuarioPassword(usr_id: string, usr_pwd: string){
    const formData = new FormData();
    
    formData.append('_userId', usr_id);
    formData.append('_userPwd', usr_pwd);

    return new Promise(resolve => {
      this.http.post(`${ URL }/app_updpwd`, formData).subscribe(
        async resp => {
          if(resp['status']){
            resolve(true);
          }else{
            resolve(false);
          }
        }
      );
    });
  }

  actualizaUsuarioEstado(usr_id: string, usr_estado: string){
    const formData = new FormData();
    
    formData.append('_userId', usr_id);
    formData.append('_userEstado', usr_estado);

    return new Promise(resolve => {
      this.http.post(`${ URL }/app_estado`, formData).subscribe(
        async resp => {
          if(resp['status']){
            resolve(true);
          }else{
            resolve(false);
          }
        }
      );
    });
  }

  actualizaUsuarioInfo(usuario: Usuario){
    const formData = new FormData();

    formData.append('_userId', usuario.id);
    formData.append('_userActivo', usuario.activo);
    formData.append('_userEmpresa', usuario.empresa);
    formData.append('_userGrupo', usuario.grupo);
    formData.append('_userEmail', usuario.email);
    formData.append('_userRol', usuario.rol);
    formData.append('_userSucursal', usuario.sucursal);

    return new Promise(resolve => {
      this.http.post(`${ URL }/app_updusr`, formData).subscribe(
        async resp => {
          if(resp['status']){
            resolve(true);
          }else{
            resolve(false);
          }
        }
      );
    });
  }
}
