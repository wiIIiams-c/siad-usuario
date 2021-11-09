import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Grupo, Rol, Usuario } from 'src/app/interfaces/interfaces';
import { ModalController, PickerController, PickerOptions, NavController } from '@ionic/angular';
import { NgForm } from '@angular/forms';
import { SelectoresService } from 'src/app/services/selectores.service';
import { Aliado } from 'src/app/interfaces/interfaces';
import { UiServiceService } from 'src/app/services/ui-service.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { LoadingServiceService } from 'src/app/services/loading-service.service';

@Component({
  selector: 'app-usuario-info',
  templateUrl: './usuario-info.page.html',
  styleUrls: ['./usuario-info.page.scss'],
})
export class UsuarioInfoPage implements OnInit {

  @Input() usuario: Usuario = null;
  @Output() estadoModal = new EventEmitter<boolean>();
  empresas: Aliado[] = [];
  grupos: Grupo[] = [];
  roles: Rol[] = [];
  nombreAliado: string = '';
  nombreEstado: string = '';
  nombreGrupo: string = '';
  nombreRol: string = '';
  rolGrupo: string = '';
  newUserData: Usuario = null;

  constructor(
    private modalCtrl: ModalController,
    private selectorService: SelectoresService,
    private pickerCtrl: PickerController,
    private uiServiceCtrl: UiServiceService,
    private usuarioService: UsuarioService,
    private navCtrl: NavController,
    private loadingService: LoadingServiceService
  ) { }

  ngOnInit() {
    this.nombreAliado = this.usuario.empresa;
    this.nombreEstado = this.usuario.activo;
    this.nombreGrupo = this.usuario.grupoNombre;
    this.nombreRol = this.usuario.rolNombre;
    this.rolGrupo = this.usuario.grupo;
  }

  ngAfterViewInit(){
    console.log('afterviewinit');
    this.selectorService.getAliados().subscribe(
      resp => {
        this.empresas = resp['empresas'];
      }
    );

    this.selectorService.getGrupos().subscribe(
      resp => {
        this.grupos = resp['grupos'];
      }
    );

    this.selectorService.getRoles().subscribe(
      resp => {
        this.roles = resp['roles'];
      }
    );
  }

  async mostrarEstado(){
    let options: PickerOptions = {
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Aplicar'
        }
      ],
      columns: [
        {
          name: 'estado',
          options: [
            {text: 'SI', value: 'SI'},
            {text: 'NO', value: 'NO'}
          ]
        }
      ]
    };

    let picker = await this.pickerCtrl.create(options);

    picker.present();
    picker.onDidDismiss().then(async data => {
      if(data['role'] != 'cancel'){
        let col = await picker.getColumn('estado');
        this.nombreEstado = col.options[col.selectedIndex].text;
      }
    });
  }

  async mostrarAliado(){
    let options: PickerOptions = {
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Aplicar'
        }
      ],
      columns: [
        {
          name: 'aliado',
          options: this.getAliados()
        }
      ]
    };

    let picker = await this.pickerCtrl.create(options);

    picker.present();
    picker.onDidDismiss().then(async data => {
      if(data['role'] != 'cancel'){
        let col = await picker.getColumn('aliado');
        this.nombreAliado = col.options[col.selectedIndex].text;
      }
    });
  }

  async mostrarGrupo(){
    let options: PickerOptions = {
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Aplicar'
        }
      ],
      columns: [
        {
          name: 'grupo',
          options: this.getGrupos()
        }
      ]
    };

    let picker = await this.pickerCtrl.create(options);

    picker.present();
    picker.onDidDismiss().then(async data => {
      if(data['role'] != 'cancel'){
        let col = await picker.getColumn('grupo');
        this.nombreRol = '';
        this.nombreGrupo = col.options[col.selectedIndex].text;
        this.rolGrupo = col.options[col.selectedIndex].value;
      }
    });
  }

  async mostrarRol(){
    let options: PickerOptions = {
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Aplicar'
        }
      ],
      columns: [
        {
          name: 'rol',
          options: this.getRoles()
        }
      ]
    };

    let picker = await this.pickerCtrl.create(options);

    picker.present();
    picker.onDidDismiss().then(async data => {
      if(data['role'] != 'cancel'){
        let col = await picker.getColumn('rol');
        this.nombreRol = col.options[col.selectedIndex].text;
      }
    });
  }

  getAliados(){
    let listaAliado = [];

    this.empresas.forEach(emp => {
      listaAliado.push({
        text: emp.nombre,
        value: emp.id
      });
    });

    return listaAliado;
  }

  getGrupos(){
    let listaGrupo = [];

    this.grupos.forEach(grp => {
      listaGrupo.push({
        text: grp.descripcion,
        value: grp.id
      });
    });

    return listaGrupo;
  }

  getRoles(){
    let listaRol = [];

    this.roles.forEach(r => {
      if(Number(r.grupo) == Number(this.rolGrupo)){
        listaRol.push({
          text: r.descripcion,
          value: r.id
        });
      }
    });

    return listaRol;
  }

  async cerrarModal(){
    await this.modalCtrl.dismiss(true);
  }

  async onSubmit(formulario: NgForm){
    if(formulario.invalid){ return; }
    
    const findAliado = this.empresas.find(elem => elem.nombre == formulario.form.value['empresa']);
    const findGrupo = this.grupos.find(elem => elem.descripcion == formulario.form.value['grupo']);
    const findRol = this.roles.find(elem => elem.descripcion == formulario.form.value['rol']);

    this.newUserData = {
      id: this.usuario.id,
      activo: formulario.form.value['estado'],
      empresa: findAliado.id,
      grupo: findGrupo.id,
      email: formulario.form.value['mail'],
      rol: findRol.id,
      sucursal: formulario.form.value['sucursal']
    };

    const validUpdate = await this.usuarioService.actualizaUsuarioInfo(this.newUserData);

    if(validUpdate){
      this.cerrarModal();
      //this.navCtrl.navigateRoot('/main/tabs/tab2', { animated: true });
    }else{
      this.uiServiceCtrl.presentToast('Ha ocurrido un problema');
    }
  }
}
