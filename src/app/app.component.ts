import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Inicio', url: '/folder/Inicio', icon: 'mail' },
    { title: 'Perros', url: '/folder/Perros', icon: 'paper-plane' },
    { title: 'Gatos', url: '/folder/Gatos', icon: 'heart' },
    { title: 'Peces', url: '/folder/Peces', icon: 'archive' },
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor() {}
}
