import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, tap } from 'rxjs';

export interface LoginRequest {
  correo: string;
  password: string;
}

export interface UsuarioResponse {
  idUsuario: number;
  nombres: string;
  apellidos: string;
  correo: string;
  telefono?: string;
  fotoPerfilUrl?: string;
  rolPrincipal: string;
  esActivo: boolean;
}

export interface AuthResponse {
  ok: boolean;
  token: string;
  usuario: UsuarioResponse;
}

export interface RegisterRequest {
  nombres: string;
  apellidos: string;
  correo: string;
  password: string;
  telefono?: string;
  rolPrincipal?: 'CONDUCTOR' | 'PROPIETARIO' | 'ADMIN';
}

export interface RegisterResponse {
  ok: boolean;
  mensaje: string;
  uid: number;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  login(payload: LoginRequest): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this.baseUrl}/api/auth/login`, payload)
      .pipe(
        tap((res) => {
          if (res?.token) {
            localStorage.setItem('token', res.token);
          }
          if (res?.usuario) {
            localStorage.setItem('usuario', JSON.stringify(res.usuario));
          }
        })
      );
  }

  getUserId(): number | null {
  const raw = localStorage.getItem('usuario');
  if (!raw) return null;

  try {
    const u: any = JSON.parse(raw);
    const id = u?.idUsuario ?? u?.id ?? u?.uid ?? u?.userId ?? null;
    return id != null ? Number(id) : null;
  } catch {
    return null;
  }
}

  register(payload: RegisterRequest): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(
      `${this.baseUrl}/api/auth/register`,
      payload
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // ✅ extra útil
  getUsuario(): UsuarioResponse | null {
  const raw = localStorage.getItem('usuario');

  if (!raw) {
    return null;
  }

  try {
    const usuario = JSON.parse(raw);

    // Validación básica
    if (!usuario || (!usuario.idUsuario && !usuario.id)) {
      return null;
    }

    // Normalizar propiedad del id
    if (!usuario.idUsuario && usuario.id) {
      usuario.idUsuario = usuario.id;
    }

    return usuario as UsuarioResponse;

  } catch (e) {
    console.error('Error leyendo usuario del localStorage', e);
    return null;
  }
}

  // ✅ extra útil
  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}