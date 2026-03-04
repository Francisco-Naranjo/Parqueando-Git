import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, LoadingController, ToastController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

import { addIcons } from 'ionicons';
import { personCircleOutline, logOutOutline, cameraOutline, createOutline, mailOutline, callOutline } from 'ionicons/icons';

type PerfilView = {
  nombreCompleto: string;
  email: string;
  telefono?: string;
  fotoUrl?: string;
};

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  private router = inject(Router);
  private loadingCtrl = inject(LoadingController);
  private toastCtrl = inject(ToastController);
  private alertCtrl = inject(AlertController);

  perfil: PerfilView = {
    nombreCompleto: 'Cargando...',
    email: 'Cargando...',
    telefono: '',
    fotoUrl: ''
  };

  ngOnInit(): void {
    addIcons({ personCircleOutline, logOutOutline, cameraOutline, createOutline, mailOutline, callOutline });
    this.cargarPerfil();
  }

  async cargarPerfil() {
    // ✅ Por ahora lo dejamos mock para que ya funcione la UI
    // Luego lo conectamos al backend /api/auth/me o /api/usuarios/{id}
    this.perfil = {
      nombreCompleto: 'Fausto Cando',
      email: 'fausto@email.com',
      telefono: '',
      fotoUrl: ''
    };
  }

  async cambiarFoto() {
    // ✅ Aquí luego conectamos Capacitor Camera + subir a backend
    const t = await this.toastCtrl.create({
      message: 'Pendiente: seleccionar foto y subirla al backend',
      duration: 2000,
      position: 'bottom'
    });
    await t.present();
  }

  async editarPerfil() {
    const alert = await this.alertCtrl.create({
      header: 'Editar perfil',
      inputs: [
        { name: 'nombreCompleto', type: 'text', placeholder: 'Nombre completo', value: this.perfil.nombreCompleto },
        { name: 'telefono', type: 'tel', placeholder: 'Teléfono', value: this.perfil.telefono ?? '' },
      ],
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Guardar',
          handler: async (data) => {
            // ✅ Aquí luego llamamos al endpoint update
            this.perfil.nombreCompleto = (data.nombreCompleto ?? '').trim() || this.perfil.nombreCompleto;
            this.perfil.telefono = (data.telefono ?? '').trim();

            const t = await this.toastCtrl.create({
              message: 'Perfil actualizado (mock)',
              duration: 1500,
              position: 'bottom'
            });
            await t.present();
          }
        }
      ]
    });

    await alert.present();
  }

  async cerrarSesion() {
    const alert = await this.alertCtrl.create({
      header: 'Cerrar sesión',
      message: '¿Seguro que deseas cerrar sesión?',
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Sí, salir',
          role: 'destructive',
          handler: async () => {
            // ✅ Aquí luego borramos token (localStorage/Capacitor Preferences)
            // localStorage.removeItem('token');
            await this.router.navigateByUrl('/auth/login', { replaceUrl: true });
          }
        }
      ]
    });

    await alert.present();
  }
}