import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-flash-header',
  templateUrl: './flash-header.component.html',
  styleUrls: ['./flash-header.component.scss'],
})
export class FlashHeaderComponent implements OnInit {

  @Input() titulo: string;

  constructor() { }

  ngOnInit() {}

}
