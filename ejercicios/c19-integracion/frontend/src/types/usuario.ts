export type Rol = 'ADMIN' | 'CLIENTE';

export type UsuarioPublico = {
  id: number;
  email: string;
  nombre: string;
  rol: Rol;
};

// POST /api/auth/login
export type Sesion = {
  token: string;
  usuario: UsuarioPublico;
};
