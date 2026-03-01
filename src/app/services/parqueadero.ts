import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs'; // Usamos 'of' para simular datos por ahora

// 1. MODELO EXACTO (Mapeado a tu SQL)
export interface Parqueadero {
  idParqueadero: number;
  idPropietario: number;
  titulo: string;           // SQL: Titulo
  direccion: string;        // SQL: Direccion
  latitud: number;          // SQL: Latitud
  longitud: number;         // SQL: Longitud
  tarifaHora: number;       // SQL: TarifaHora
  tarifaDia: number;        // SQL: TarifaDia
  calificacion: number;     // SQL: CalificacionPromedio
  imagenUrl: string;        // SQL: Imagen_Portada_Url
  amenidades: {             // Agrupamos los bits para limpieza
    camara: boolean;        // SQL: TieneCamara
    techo: boolean;         // SQL: TieneTecho
    guardia: boolean;       // SQL: TieneGuardia
  };
  estado: 'DISPONIBLE' | 'OCUPADO' | 'RESERVADO'; // SQL: Estado_Visual
}

@Injectable({
  providedIn: 'root'
})
export class ParqueaderoService {

  constructor() { }

  // 2. DATOS MOCK (Simulando tu SQL Server para probar YA MISMO)
  // Estos datos tienen la estructura exacta de tu tabla.
  private parqueaderosDemo: Parqueadero[] = [
    {
      idParqueadero: 1,
      idPropietario: 101,
      titulo: 'Garaje Seguro Quicentro',
      direccion: 'Av. Naciones Unidas y Shyris, Quito',
      latitud: -0.1764, 
      longitud: -78.4795,
      tarifaHora: 1.50,
      tarifaDia: 10.00,
      calificacion: 4.8,
      imagenUrl: 'https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&w=800&q=80', // Foto Real
      amenidades: { camara: true, techo: true, guardia: true },
      estado: 'DISPONIBLE'
    },
    {
      idParqueadero: 2,
      idPropietario: 102,
      titulo: 'Parqueo Abierto La Carolina',
      direccion: 'Av. Amazonas y República, Quito',
      latitud: -0.1820, 
      longitud: -78.4850,
      tarifaHora: 1.00,
      tarifaDia: 8.00,
      calificacion: 4.2,
      imagenUrl: 'https://images.unsplash.com/photo-1470224114660-3f6686c562eb?auto=format&fit=crop&w=800&q=80',
      amenidades: { camara: false, techo: false, guardia: true },
      estado: 'DISPONIBLE'
    },
    {
      idParqueadero: 3,
      idPropietario: 103,
      titulo: 'Parqueo Subterráneo Estadio',
      direccion: 'Calle José Correa, Quito',
      latitud: -0.1780, 
      longitud: -78.4750,
      tarifaHora: 2.00,
      tarifaDia: 15.00,
      calificacion: 5.0,
      imagenUrl: 'https://images.unsplash.com/photo-1590674899484-d5640e854abe?auto=format&fit=crop&w=800&q=80',
      amenidades: { camara: true, techo: true, guardia: true },
      estado: 'OCUPADO'
    }
  ];

  // 3. MÉTODOS PARA EL MAPA
  obtenerParqueaderos(): Observable<Parqueadero[]> {
    // Aquí luego conectaremos con tu API Java Spring Boot
    return of(this.parqueaderosDemo);
  }

  obtenerPorId(id: number): Observable<Parqueadero | undefined> {
    const found = this.parqueaderosDemo.find(p => p.idParqueadero === id);
    return of(found);
  }

  // Helper para el color del pin en el mapa
  obtenerIconoPorEstado(estado: string): string {
    return estado === 'DISPONIBLE' 
      ? 'http://maps.google.com/mapfiles/ms/icons/green-dot.png' 
      : 'http://maps.google.com/mapfiles/ms/icons/red-dot.png';
  }
}