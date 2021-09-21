import { Component, Input, OnInit } from '@angular/core';
import { Grupo, Rol, Usuario } from 'src/app/interfaces/interfaces';
import { ModalController, PickerController, PickerOptions } from '@ionic/angular';
import { NgForm } from '@angular/forms';
import { SelectoresService } from 'src/app/services/selectores.service';
import { Aliado } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-usuario-info',
  templateUrl: './usuario-info.page.html',
  styleUrls: ['./usuario-info.page.scss'],
})
export class UsuarioInfoPage implements OnInit {

  @Input() usuario: Usuario = null;
  empresas: Aliado[] = [];
  grupos: Grupo[] = [];
  roles: Rol[] = [];
  nombreAliado: string = '';
  nombreEstado: string = '';
  nombreGrupo: string = '';
  nombreRol: string = '';
  rolGrupo: string = '';

  constructor(
    private modalCtrl: ModalController,
    private selectorService: SelectoresService,
    private pickerCtrl: PickerController
  ) { }

  ngOnInit() {
    console.log(this.usuario);
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
      let col = await picker.getColumn('estado');
      this.nombreEstado = col.options[col.selectedIndex].text;
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
      let col = await picker.getColumn('aliado');
      console.log('col: ', col);
      this.nombreAliado = col.options[col.selectedIndex].text;
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
      let col = await picker.getColumn('grupo');
      console.log('col ', col);
      this.nombreGrupo = col.options[col.selectedIndex].text;
      this.rolGrupo = col.options[col.selectedIndex].value;
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
      let col = await picker.getColumn('rol');
      console.log(col);
      this.nombreRol = col.options[col.selectedIndex].text;
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

  cerrarModal(){
    this.modalCtrl.dismiss();
  }

  onSubmit(formulario: NgForm){

  }
}
