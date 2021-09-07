import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, CanLoad } from '@angular/router';
import { Observable } from 'rxjs';
import { AccesoService } from '../services/acceso.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioGuard implements CanLoad {
  constructor(
    private accesoService: AccesoService
  ){}
  
  canLoad(): Observable<boolean> | Promise<boolean> | boolean {
    return this.accesoService.validaToken();
  }

  /* canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  } */
}
