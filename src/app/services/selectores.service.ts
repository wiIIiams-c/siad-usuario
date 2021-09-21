import { Injectable } from '@angular/core';
import { ListaAliado, ListaGrupo, ListaRol } from '../interfaces/interfaces';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class SelectoresService {

  constructor(
    private http: HttpClient
  ) { }

  getAliados(){
    return this.http.get<ListaAliado>(`${ URL }/app_aliado`);
  }

  getGrupos(){
    return this.http.get<ListaGrupo>(`${ URL }/app_grupos`);
  }

  getRoles(){
    return this.http.get<ListaRol>(`${ URL }/app_roles`);
  }
}
