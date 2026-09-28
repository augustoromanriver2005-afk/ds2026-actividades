import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { apiFetch } from '../services/api';
import { guardarToken, obtenerToken, borrarToken } from '../services/sesion';
import type { UsuarioPublico, Rol, Credenciales, Sesion } from '../types/usuario';

interface AuthContextType {
  usuario: UsuarioPublico | null; // null = nadie logueado
  cargando: boolean; // true mientras averiguamos quién sos
  estaAutenticado: boolean; // usuario !== null, para leer más cómodo
  tieneRol: (rol: Rol) => boolean; // usuario?.rol === rol
  login: (credenciales: Credenciales) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [usuario, setUsuario] = useState<UsuarioPublico | null>(null);
  const [cargando, setCargando] = useState(obtenerToken() !== null);

  // Rehidratación: F5 borra el estado de React, no el token. Se lo pregunto al back.
  useEffect(() => {
    if (!obtenerToken()) return; // sin token no hay nada que averiguar
    apiFetch<UsuarioPublico>('/auth/yo')
      .then(setUsuario)
      .catch(() => borrarToken()) // vencido o inválido: se limpia
      .finally(() => setCargando(false));
  }, []);

  function logout() {
    borrarToken();
    setUsuario(null);
  }

  // El 401 con token que dispara apiFetch: el back avisa, el front cierra la sesión.
  useEffect(() => {
    window.addEventListener('sesion-expirada', logout);
    return () => window.removeEventListener('sesion-expirada', logout);
  }, []);

  async function login(credenciales: Credenciales) {
    const sesion = await apiFetch<Sesion>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credenciales),
    });
    guardarToken(sesion.token);
    setUsuario(sesion.usuario);
  }

  const value: AuthContextType = {
    usuario,
    cargando,
    estaAutenticado: usuario !== null,
    tieneRol: (rol) => usuario?.rol === rol,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components -- el hook vive junto al Provider, patrón de C12
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth debe usarse dentro de <AuthProvider>');
  return context;
}
