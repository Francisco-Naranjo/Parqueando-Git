import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, NavController, ToastController, LoadingController } from '@ionic/angular'; // Agregamos LoadingController
import { addIcons } from 'ionicons';
import { 
  carSport, personOutline, mailOutline, lockClosedOutline, 
  eyeOutline, eyeOffOutline 
} from 'ionicons/icons';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule]
})
export class RegistroPage {
  usuario = { nombre: '', email: '', password: '' };
  verPassword = false;

  constructor(
    private navCtrl: NavController,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController // Inyectamos el loader
  ) {
    addIcons({ carSport, personOutline, mailOutline, lockClosedOutline, eyeOutline, eyeOffOutline });
  }

  async registrarUsuario() {
    // 1. Validar campos vacíos
    if (!this.usuario.nombre || !this.usuario.email || !this.usuario.password) {
      this.mostrarToast('Por favor, completa todos los campos', 'warning');
      return;
    }

    // 2. Validar formato de email (Regex Estándar)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.usuario.email)) {
      this.mostrarToast('Ingresa un correo electrónico válido', 'danger');
      return;
    }

    // 3. Validar longitud de contraseña
    if (this.usuario.password.length < 6) {
      this.mostrarToast('La contraseña debe tener al menos 6 caracteres', 'warning');
      return;
    }

    // 4. Simulación de Registro con Loading (UX Profesional)
    const loading = await this.loadingCtrl.create({
      message: 'Creando tu cuenta...',
      spinner: 'crescent'
    });
    await loading.present();

    // Simulamos una espera de red (aquí iría tu llamada a Firebase/API)
    setTimeout(async () => {
      await loading.dismiss();
      
      this.mostrarToast('¡Bienvenido a ParqueAndo!', 'success'); // Toast verde de éxito
      
      // Redirigir al Login o directamente al Home
      this.navCtrl.navigateRoot('/auth/login');
    }, 1500);
  }

  async mostrarToast(msg: string, color: string) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 2000,
      color: color,
      position: 'top',
      mode: 'ios' // Estilo iOS para mayor elegancia
    });
    await toast.present();
  }

  volverAlLogin() {
    this.navCtrl.back();
  }
}
