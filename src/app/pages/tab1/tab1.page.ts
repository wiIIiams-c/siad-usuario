import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  usuarios: Usuario[] = [];
  habilitado = true;

  constructor(
    private usuarioService: UsuarioService
  ) {}

  ngOnInit(){
    this.siguientes();
  }

  recargar(event){
    this.siguientes(event, true);
    this.habilitado = true;
    this.usuarios = [];
  }

  siguientes(event?, pull: boolean = false){
    this.usuarioService.getUsuarios(pull).subscribe(
      resp => {
        console.log('tab1 siguientes');
        console.log(resp);
        this.usuarios.push(...resp.usuarios);

        if(event){
          event.target.complete();

          if(resp.usuarios.length === 0){
            this.habilitado = false;
          }
        }
      }
    );
  }
}
