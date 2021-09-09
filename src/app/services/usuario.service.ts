import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { RespuestaUsuarios, Usuario } from '../interfaces/interfaces';
import { AccesoService } from './acceso.service';

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
}
