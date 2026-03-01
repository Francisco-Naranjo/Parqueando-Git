import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { 
  scanOutline, 
  carSportOutline, 
  walletOutline, 
  timeOutline,
  locationOutline,
  notificationsOutline
} from 'ionicons/icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule]
})
export class HomePage implements OnInit {
  
  // Simulamos una reserva activa (esto vendría de tu SQL Server)
  reservaActiva = {
    activa: true,
    lugar: 'Parqueo Subterráneo Estadio',
    placa: 'PBX-1234',
    tiempoRestante: '45 min',
    total: 2.25
  };

  recientes = [
    { titulo: 'CC El Jardín', direccion: 'Av. Amazonas', img: 'assets/placeholder-1.jpg' },
    { titulo: 'Plaza Foch', direccion: 'La Mariscal', img: 'assets/placeholder-2.jpg' }
  ];

  constructor() {
    addIcons({ scanOutline, carSportOutline, walletOutline, timeOutline, locationOutline, notificationsOutline });
  }

  ngOnInit() {}
}
