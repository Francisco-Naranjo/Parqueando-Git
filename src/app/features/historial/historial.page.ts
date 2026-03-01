import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router'; // Importamos Router
import { addIcons } from 'ionicons';
import { 
  calendarOutline, 
  timeOutline, 
  locationOutline, 
  repeatOutline,
  receiptOutline,
  chevronForwardOutline
} from 'ionicons/icons';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.page.html',
  styleUrls: ['./historial.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule]
})
export class HistorialPage implements OnInit {
  
  segmentoSeleccionado = 'activos';

  // DATOS AJUSTADOS: Ahora coinciden con lo que espera VoucherPage
  reservasActivas = [
    {
      codigo: 'PK-8821', // Antes era id
      parqueadero: { 
        titulo: 'Parqueo Subterráneo Estadio', 
        direccion: 'Calle José Correa, Quito' 
      },
      fecha: 'Hoy, 28 Feb',
      horas: 1, // Duración estimada
      entrada: '18:30',
      estado: 'en curso',
      total: 2.25,
      img: 'assets/placeholder-1.jpg'
    }
  ];

  historialPasado = [
    {
      lugar: 'Garaje La Carolina',
      fecha: '25 Feb, 2026',
      duracion: '2h 15m',
      estado: 'completado',
      total: 3.50
    },
    {
      lugar: 'CC El Jardín',
      fecha: '20 Feb, 2026',
      duracion: '4h 00m',
      estado: 'cancelado',
      total: 0.00
    }
  ];

  // Inyectamos el Router en el constructor
  constructor(private router: Router) {
    addIcons({ calendarOutline, timeOutline, locationOutline, repeatOutline, receiptOutline, chevronForwardOutline });
  }

  ngOnInit() {}

  // FUNCIÓN CLAVE: Navega y pasa los datos al Voucher
  verTicket(reserva: any) {
    this.router.navigate(['/voucher'], { 
      state: reserva 
    });
  }
}