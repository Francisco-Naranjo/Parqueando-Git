import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
// Importamos ActionSheetController para el menú de opciones
import { IonicModule, NavController, ModalController, ActionSheetController } from '@ionic/angular'; 
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { 
  createOutline, carSportOutline, cardOutline, notificationsOutline, 
  shieldCheckmarkOutline, helpCircleOutline, logOutOutline, addOutline, 
  chevronForwardOutline, trashOutline, pencilOutline, starOutline 
} from 'ionicons/icons';

import { AgregarAutoPage } from './agregar-auto/agregar-auto.page';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule]
})
export class PerfilPage implements OnInit {

  usuario = {
    nombre: 'Francisco Naranjo',
    email: 'francisco@arcastore.com',
    avatar: 'https://i.pravatar.cc/300?u=francisco'
  };

  vehiculos = [
    { marca: 'Chery', modelo: 'Tiggo 7 Pro', placa: 'PBX-1234', principal: true, imagen: 'assets/car-placeholder.png' },
    { marca: 'Chevrolet', modelo: 'Sail', placa: 'PCD-5678', principal: false, imagen: 'assets/car-placeholder.png' }
  ];

  opcionesCuenta = [
    { icono: 'card-outline', titulo: 'Métodos de Pago', dato: 'Visa •••• 4242' },
    { icono: 'notifications-outline', titulo: 'Notificaciones', dato: 'Activadas' },
    { icono: 'shield-checkmark-outline', titulo: 'Seguridad y Privacidad', dato: '' },
    { icono: 'help-circle-outline', titulo: 'Ayuda y Soporte', dato: '' }
  ];

  constructor(
    private router: Router, 
    private navCtrl: NavController,
    private modalCtrl: ModalController,
    private actionSheetCtrl: ActionSheetController // Inyectamos el controlador
  ) {
    addIcons({ 
      createOutline, carSportOutline, cardOutline, notificationsOutline, 
      shieldCheckmarkOutline, helpCircleOutline, logOutOutline, addOutline, 
      chevronForwardOutline, trashOutline, pencilOutline, starOutline 
    });
  }

  ngOnInit() {}

  // 1. MENÚ DE OPCIONES (Soluciona tu error TS2339)
  async abrirOpcionesAuto(auto: any) {
    const actionSheet = await this.actionSheetCtrl.create({
      header: `${auto.marca} ${auto.modelo}`,
      subHeader: `Placa: ${auto.placa}`,
      mode: 'ios',
      buttons: [
        {
          text: 'Marcar como Principal',
          icon: 'star-outline',
          handler: () => { this.marcarComoPrincipal(auto); }
        },
        {
          text: 'Editar Vehículo',
          icon: 'pencil-outline',
          handler: () => { this.editarAuto(auto); }
        },
        {
          text: 'Eliminar del Garaje',
          role: 'destructive',
          icon: 'trash-outline',
          handler: () => { this.eliminarAuto(auto); }
        },
        {
          text: 'Cancelar',
          role: 'cancel',
          icon: 'close-outline'
        }
      ]
    });
    await actionSheet.present();
  }

  // 2. LÓGICA CRUD: ELIMINAR
  eliminarAuto(auto: any) {
    this.vehiculos = this.vehiculos.filter(v => v !== auto);
  }

  // 3. LÓGICA CRUD: EDITAR
  async editarAuto(auto: any) {
    const modal = await this.modalCtrl.create({
      component: AgregarAutoPage,
      componentProps: { autoParaEditar: auto }, // Pasamos el auto al modal
      breakpoints: [0, 0.75],
      initialBreakpoint: 0.75
    });
    await modal.present();

    const { data } = await modal.onWillDismiss();
    if (data) {
      const index = this.vehiculos.indexOf(auto);
      if (index > -1) {
        this.vehiculos[index] = data; // Reemplazamos con los nuevos datos
      }
    }
  }

  // 4. LÓGICA DE PRINCIPAL
  marcarComoPrincipal(auto: any) {
    this.vehiculos.forEach(v => v.principal = false);
    auto.principal = true;
  }

  // AGREGAR NUEVO VEHÍCULO
  async agregarVehiculo() {
    const modal = await this.modalCtrl.create({
      component: AgregarAutoPage,
      breakpoints: [0, 0.75],
      initialBreakpoint: 0.75
    });
    await modal.present();
    const { data } = await modal.onWillDismiss();
    if (data) {
      if (data.principal) this.vehiculos.forEach(v => v.principal = false);
      this.vehiculos.push(data);
    }
  }

  abrirOpcion(titulo: string) { console.log('Opción:', titulo); }
  editarPerfil() { console.log('Editando perfil...'); }
  cerrarSesion() { this.navCtrl.navigateRoot('/auth/login'); }
}