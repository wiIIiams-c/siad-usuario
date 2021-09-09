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
    empresa?: string;
    activo?: string;
    clave_expira?: string;
    usuario_expira?: string;
    clave?: string;
    usuario?: string;
    email?: string;
}