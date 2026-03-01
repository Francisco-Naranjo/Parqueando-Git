import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { 
  arrowBackOutline, 
  cardOutline, 
  walletOutline, // Usaste wallet en tu HTML
  checkmarkCircle, 
  shieldCheckmarkOutline,
  scanCircleOutline 
} from 'ionicons/icons';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule]
})
export class CheckoutPage implements OnInit {
  reserva: any;
  
  // 1. Aquí definimos la lista que recorre el *ngFor en tu HTML
  metodosPago = [
    { id: 'deuna', nombre: 'Deuna!', descripcion: 'Pago directo', icono: 'scan-circle-outline' },
    { id: 'tarjeta', nombre: 'Visa •••• 4242', descripcion: 'Crédito / Débito', icono: 'card-outline' },
    { id: 'efectivo', nombre: 'Efectivo', descripcion: 'Pagar en sitio', icono: 'wallet-outline' }
  ];

  // 2. Variable para saber cuál está marcado en azul
  metodoSeleccionado: string = 'deuna';

  constructor(private router: Router) {
    addIcons({ arrowBackOutline, cardOutline, walletOutline, checkmarkCircle, shieldCheckmarkOutline, scanCircleOutline });
    
    const nav = this.router.getCurrentNavigation();
    if (nav?.extras.state) {
      this.reserva = nav.extras.state;
    }
  }

  ngOnInit() {}

  // 3. Función para activar el botón al hacer clic
  seleccionarMetodo(id: string) {
    this.metodoSeleccionado = id;
  }

  // 4. Función del botón "CONFIRMAR Y PAGAR"
  confirmarPago() {
    this.router.navigate(['/voucher'], { 
      state: { 
        ...this.reserva,
        metodoPago: this.metodoSeleccionado,
        codigo: 'PK-' + Math.floor(Math.random() * 1000000),
        total: (this.reserva?.total || 0) + 0.25
      } 
    });
  }
}