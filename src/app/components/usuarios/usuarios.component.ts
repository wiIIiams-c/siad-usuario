import { Component, Input, OnInit } from '@angular/core';
import { Usuario } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss'],
})
export class UsuariosComponent implements OnInit {

  @Input() usuarios: Usuario[] = [];

  constructor() { }

  ngOnInit() {
    console.log('init componentes usuarios');
    console.log(this.usuarios);
  }

}
