import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-flash-header',
  templateUrl: './flash-header.component.html',
  styleUrls: ['./flash-header.component.scss'],
})

export class FlashHeaderComponent implements OnInit {

  //Necesario para que el componente acepte parametros
  @Input() titulo: string;

  constructor() { }

  ngOnInit() {}

}
