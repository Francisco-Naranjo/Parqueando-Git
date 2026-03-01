import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
// 👇 ESTA LÍNEA FALTABA (Error TS2304: Cannot find name 'FormsModule')
import { FormsModule } from '@angular/forms'; 
import { IonicModule, NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { closeOutline, downloadOutline, logoWhatsapp, navigateOutline } from 'ionicons/icons';
// 👇 ESTA LÍNEA TAMBIÉN FALTABA (Error TS2304: Cannot find name 'QRCodeComponent')
import { QRCodeComponent } from 'angularx-qrcode'; 

@Component({
  selector: 'app-voucher',
  // 👇 VERIFICA ESTO: Debe decir 'voucher.page.html', NO 'checkout.page.html'
  templateUrl: './voucher.page.html', 
  styleUrls: ['./voucher.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule, QRCodeComponent]
})
export class VoucherPage implements OnInit {
  reserva: any = null;
  qrData: string = '';

  constructor(private router: Router, private navCtrl: NavController) {
    addIcons({ closeOutline, downloadOutline, logoWhatsapp, navigateOutline });
    
    const nav = this.router.getCurrentNavigation();
    if (nav?.extras.state) {
      this.reserva = nav.extras.state;
      // Generamos el string único para el QR
      this.qrData = `RES:${this.reserva.codigo}|LUGAR:${this.reserva.parqueadero?.titulo}`;
    }
  }

  ngOnInit() {}

  contactarWhatsApp() {
    const telefono = "593999999999"; 
    const mensaje = `Hola! Tengo una reserva en ${this.reserva?.parqueadero?.titulo}. Código: ${this.reserva?.codigo}`;
    window.open(`https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`, '_system');
  }

  abrirMapas() {
    // Usamos la API universal de Google Maps
    const destino = encodeURIComponent(`${this.reserva?.parqueadero?.titulo}, Quito`);
    const url = `https://www.google.com/maps/search/?api=1&query=${destino}`;
    window.open(url, '_system');
  }

  descargarPDF() { console.log('Simulando descarga de PDF...'); }
  
  irAHome() { this.navCtrl.navigateRoot('/app/tabs/mapa'); }
  
  cerrar() { this.irAHome(); }
}