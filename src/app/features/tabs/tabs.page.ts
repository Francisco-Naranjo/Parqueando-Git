import { Component, EnvironmentInjector, inject } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { addIcons } from 'ionicons';
// IMPORTANTE: Asegúrate de que mapOutline esté aquí
import { gridOutline, mapOutline, bookmarkOutline, personOutline, settingsOutline } from 'ionicons/icons';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
  standalone: true,
  imports: [IonicModule],
})
export class TabsPage {
  public environmentInjector = inject(EnvironmentInjector);

  constructor() {
    // Registramos TODOS los iconos que usaremos
    addIcons({ gridOutline, mapOutline, bookmarkOutline, personOutline, settingsOutline });
  }
}