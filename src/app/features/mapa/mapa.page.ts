import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { 
  searchOutline, optionsOutline, locationOutline, 
  gridOutline, bookmarkOutline, settingsOutline, 
  chevronDownOutline 
} from 'ionicons/icons';
import { ParqueaderoService, Parqueadero } from '../../services/parqueadero';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.page.html',
  styleUrls: ['./mapa.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule]
})
export class MapaPage implements OnInit {
  parqueaderos: Parqueadero[] = [];
  parqueaderosFiltrados: Parqueadero[] = [];

  constructor(
    private service: ParqueaderoService,
    private router: Router
  ) {
    addIcons({ 
      searchOutline, optionsOutline, locationOutline, 
      gridOutline, bookmarkOutline, settingsOutline, chevronDownOutline 
    });
  }

  ngOnInit() {
    this.service.obtenerParqueaderos().subscribe(data => {
      this.parqueaderos = data;
      this.parqueaderosFiltrados = data;
    });
  }

  buscar(event: any) {
    const texto = event.target.value.toLowerCase();
    if (texto && texto.trim() !== '') {
      this.parqueaderos = this.parqueaderosFiltrados.filter(p => 
        p.titulo.toLowerCase().includes(texto) || p.direccion.toLowerCase().includes(texto)
      );
    } else {
      this.parqueaderos = [...this.parqueaderosFiltrados];
    }
  }

  abrirFiltros() { console.log('Filtros'); }
  cambiarVista(v: string) { console.log(v); }

  irADetalle(p: Parqueadero) {
    this.router.navigate(['/detalle-parqueadero'], { state: { data: p } });
  }
} 