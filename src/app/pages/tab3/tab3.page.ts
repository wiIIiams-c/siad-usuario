import { Component } from '@angular/core';
import { Usuario } from 'src/app/interfaces/interfaces';
import { AccesoService } from 'src/app/services/acceso.service';
import { NgForm } from '@angular/forms';
import { UiServiceService } from 'src/app/services/ui-service.service';


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  usuario: Usuario = {};

  constructor(
    private accesoService: AccesoService,
    private uiService: UiServiceService
  ) {}

  ngOnInit(){
    this.usuario = this.accesoService.getUsuario();
  }

  logout() {
    this.accesoService.logout();
  }
}
