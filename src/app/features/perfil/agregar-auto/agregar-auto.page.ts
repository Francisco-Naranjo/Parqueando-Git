import { Component, Input, OnInit } from '@angular/core'; // Importamos Input y OnInit
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { closeOutline, cameraOutline, carSportOutline } from 'ionicons/icons';

@Component({
  selector: 'app-agregar-auto',
  templateUrl: './agregar-auto.page.html',
  styleUrls: ['./agregar-auto.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule]
})
export class AgregarAutoPage implements OnInit {
  
  // Esta variable recibirá el auto si estamos EDITANDO
  @Input() autoParaEditar: any;

  nuevoAuto = {
    marca: '',
    modelo: '',
    placa: '',
    principal: false,
    imagen: 'assets/car-placeholder.png'
  };

  titulo = 'Nuevo Vehículo'; // Para cambiar el título dinámicamente

  constructor(private modalCtrl: ModalController) {
    addIcons({ closeOutline, cameraOutline, carSportOutline });
  }

  ngOnInit() {
    // Si recibimos un auto, llenamos el formulario con sus datos
    if (this.autoParaEditar) {
      this.titulo = 'Editar Vehículo';
      // Usamos { ... } para crear una copia y no modificar el original todavía
      this.nuevoAuto = { ...this.autoParaEditar };
    }
  }

  cerrar() {
    this.modalCtrl.dismiss(null);
  }

  guardar() {
    if (this.nuevoAuto.marca && this.nuevoAuto.placa) {
      // Devolvemos el auto (ya sea nuevo o editado)
      this.modalCtrl.dismiss(this.nuevoAuto);
    } else {
      alert('Por favor completa la marca y la placa');
    }
  }
}