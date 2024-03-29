import { Component, ViewChild } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from 'src/app/interfaces/interfaces';
import { IonSearchbar } from '@ionic/angular';
import { LoadingServiceService } from 'src/app/services/loading-service.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  usuarioBuscar = '';
  buscando = false;
  usuarios: Usuario[] = [];
  @ViewChild('buscarUsuario') searchBar: IonSearchbar;

  constructor(
    private usuarioService: UsuarioService,
    private loadingService: LoadingServiceService
  ) {}

  async ngOnInit(){
    await this.loadingService.dismiss();
  }

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

  recibeEstadoEmitter(event){
    if(event){
      this.usuarios = [];
      this.buscando = false;
      this.searchBar.value = null;
    }
  }
}
