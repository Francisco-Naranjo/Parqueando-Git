import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { 
  arrowBackOutline, heartOutline, star, locationSharp, videocamOutline, 
  shieldCheckmarkOutline, umbrellaOutline, calendarOutline, timeOutline, 
  chevronForward, carOutline 
} from 'ionicons/icons';
import { Parqueadero } from '../../services/parqueadero';

@Component({
  selector: 'app-detalle-parqueadero',
  templateUrl: './detalle-parqueadero.page.html',
  styleUrls: ['./detalle-parqueadero.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule]
})
export class DetalleParqueaderoPage implements OnInit {
  parqueadero?: Parqueadero;
  horas: number = 1;
  total: number = 0;

  constructor(private router: Router) {
    addIcons({ 
      arrowBackOutline, heartOutline, star, locationSharp, videocamOutline, 
      shieldCheckmarkOutline, umbrellaOutline, calendarOutline, timeOutline, 
      chevronForward, carOutline 
    });
    
    // Recuperamos la data enviada por navegación
    const nav = this.router.getCurrentNavigation();
    if (nav?.extras.state) {
      this.parqueadero = nav.extras.state['data'];
      this.calcularTotal();
    }
  }

  ngOnInit() {}

  ajustarHoras(val: number) {
    this.horas = Math.max(1, this.horas + val);
    this.calcularTotal();
  }

  calcularTotal() {
    this.total = (this.parqueadero?.tarifaHora || 0) * this.horas;
  }

  volver() { this.router.navigate(['/app/tabs/mapa']); }

confirmarReserva() {
  this.router.navigate(['/checkout'], { 
    state: { 
      parqueadero: this.parqueadero, 
      horas: this.horas, 
      total: this.total 
    } 
  });
}
}