import { Component, Input, OnInit } from '@angular/core';
import { Usuario } from 'src/app/interfaces/interfaces';
import { UsuarioService } from 'src/app/services/usuario.service';
import { UiServiceService } from 'src/app/services/ui-service.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss'],
})
export class UsuariosComponent implements OnInit {

  @Input() usuarios: Usuario[] = [];

  constructor(
    private usuarioService: UsuarioService,
    private uiService: UiServiceService,
    private navCtrl: NavController
  ) { }

  ngOnInit() {
    
  }

  async actualizaEstado(user: Usuario){
    const valido = await this.usuarioService.actualizaUsuarioEstado(user.id, user.activo);

    if(valido){
      this.uiService.presentToast('Estado usuario actualizado');

      setTimeout(() => {
        this.navCtrl.navigateRoot('/main/tabs/tab1', { animated: true });
      }, 2000);
    }else{
      this.uiService.presentToast('Ha ocurrido un problema');
    }
  }
}
