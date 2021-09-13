import { Component } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  usuarioBuscar = '';
  buscando = false;
  usuarios: Usuario[] = [];

  constructor(
    private usuarioService: UsuarioService
  ) {}

  onSearchChange(event){
    const valor = event.detail.value;
    this.buscando = true;

    if(valor.length === 0){
      this.buscando = false;
      this.usuarios = [];
      return;
    }

    this.usuarioService.buscarUsuarios(valor).subscribe(
      resp => {
        this.usuarios = resp['usuarios'];
        this.buscando = false;
      }
    );
  }
}
