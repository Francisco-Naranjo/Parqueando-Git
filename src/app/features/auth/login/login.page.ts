import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router'; // ✅ Usamos Router
import { IonicModule } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { mail, lockClosed, carSport } from 'ionicons/icons';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule] 
})
export class LoginPage implements OnInit {

  constructor(private router: Router) { 
    addIcons({ mail, lockClosed, carSport });
  }

  ngOnInit() {}

  ingresar() {
    console.log('Ingresando...');
    this.router.navigate(['/app/tabs/mapa']);
  }

  // ✅ ESTA FUNCIÓN ES LA QUE RESPONDE AL CLICK DEL HTML
  crearCuenta() {
    console.log('Yendo a registro...');
    this.router.navigate(['/auth/registro']);
  }
}