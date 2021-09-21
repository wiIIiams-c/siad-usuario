export interface RespuestaUsuarios {
    ok: boolean;
    pagina: number;
    usuarios: Usuario[];
}

export interface Usuario {
    id?: string;
    nombre?: string;
    id_empresa?: string;
    rol?: string;
    rolNombre?: string;
    grupo?: string;
    grupoNombre?: string;
    empresa?: string;
    activo?: string;
    clave_expira?: string;
    usuario_expira?: string;
    clave?: string;
    usuario?: string;
    email?: string;
    sucursal?: string;
}

export interface ListaAliado {
    aliados: Aliado[];
}

export interface Aliado {
    id?: string;
    nombre?: string;
}

export interface ListaGrupo {
    grupos: Grupo[];
}

export interface Grupo {
    id?: string;
    descripcion?: string;
}

export interface ListaRol {
    roles: Rol[];
}

export interface Rol {
    id?: string;
    descripcion?: string;
    grupo?: string;
}