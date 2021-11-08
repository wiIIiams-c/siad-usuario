import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Usuario } from 'src/app/interfaces/interfaces';
import { UsuarioService } from 'src/app/services/usuario.service';
import { UiServiceService } from 'src/app/services/ui-service.service';
import { NavController, ModalController, AlertController } from '@ionic/angular';
import { UsuarioInfoPage } from '../../pages/usuario-info/usuario-info.page';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss'],
})
export class UsuariosComponent implements OnInit {

  @Input() usuarios: Usuario[] = [];
  @Output() estadoPwd = new EventEmitter<boolean>();

  constructor(
    private usuarioService: UsuarioService,
    private uiService: UiServiceService,
    private navCtrl: NavController,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController
  ) { }

  ngOnInit() {
    
  }

  async actualizaEstado(user: Usuario){
    const valido = await this.usuarioService.actualizaUsuarioEstado(user.id, user.activo);

    if(valido){
      this.uiService.presentToast('Estado usuario actualizado');

      setTimeout(() => {
        this.estadoPwd.emit(true);
      }, 2000);
    }else{
      this.uiService.presentToast('Ha ocurrido un problema');
    }
  }

  async mostrarInfo(user: Usuario){
    const modal = await this.modalCtrl.create({
      component: UsuarioInfoPage,
      componentProps: {
        usuario: user
      }
    });

    modal.onDidDismiss().then(
      (resp) => {
        if(resp){
          console.log('cierro modal y lee la variable que le asigne al dismiss');
          
        }
      }
    )

    return await modal.present();
  }

  async actualizaClave(user: Usuario){
    const alertPwd = await this.alertCtrl.create({
      header: 'Nueva Clave ' + user.nombre,
      backdropDismiss: false,
      inputs: [
        {
          name: 'Password',
          type: 'password',
          placeholder: 'Nueva Password'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary'
        },
        {
          text: 'Confirmar',
          handler: async (data: string) => {
            const valido = await this.usuarioService.actualizaUsuarioPassword(user.id, data['Password']);

            if(valido){
              this.estadoPwd.emit(true);
              this.uiService.presentToast('Password Actualizada');
              //redirect or reload parent page
            }else{
              this.uiService.presentToast('Ha ocurrido un problema');
            }
          }
        }
      ]
    });

    await alertPwd.present();
  }
}
