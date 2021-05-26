import { Component, OnInit, ViewChild, ElementRef, Renderer2, Input } from '@angular/core';
import { IonContent } from '@ionic/angular';

@Component({
  selector: 'app-scroll',
  templateUrl: './scroll.component.html',
  styleUrls: ['./scroll.component.scss'],
})

export class ScrollComponent implements OnInit {

  //Para que el componente reciba parametros
  @Input() content: any = [];
  //Para definir que vamos a observar el comportamiento de ion-content
  @ViewChild(IonContent, {read: ElementRef, static: true}) contenido: ElementRef;
  //Para definir que vamos a observar el comportamiento de un elemento definido como triggerElement
  @ViewChild('triggerElement', {read: ElementRef, static: true}) triggerElement: ElementRef;

  public folder: string;
  private observer: IntersectionObserver;

  constructor(private renderer: Renderer2) { }

  ngOnInit() {

    console.log(this.contenido);
    this.observer = new IntersectionObserver((entries) => {

      entries.forEach((entry: any) => {

        //Si en la pantalla no se muestra el "triggerElement", al elemento ion-content se le quita el estilo no-scroll
        if(entry.isIntersecting) {
          this.renderer.removeClass(this.contenido.nativeElement, 'no-scroll');

          //Si en la pantalla se muestra el "triggerElement", al elemento ion-content se le agrega el estilo no-scroll
        } else {
          this.renderer.addClass(this.contenido.nativeElement, 'no-scroll');
        }
      });

    });

    //Si aparece en pantalla el elemento "triggerElement" ejecutará el if
    this.observer.observe(this.triggerElement.nativeElement);
  }

}
