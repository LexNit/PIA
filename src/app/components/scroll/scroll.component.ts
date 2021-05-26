import { Component, OnInit, ViewChild, ElementRef, Renderer2, Input } from '@angular/core';
import { IonContent } from '@ionic/angular';

@Component({
  selector: 'app-scroll',
  templateUrl: './scroll.component.html',
  styleUrls: ['./scroll.component.scss'],
})
export class ScrollComponent implements OnInit {

  @Input() content: any = [];
  @ViewChild(IonContent, {read: ElementRef, static: true}) contenido: ElementRef;
  @ViewChild('triggerElement', {read: ElementRef, static: true}) triggerElement: ElementRef;
  public folder: string;
  private observer: IntersectionObserver;

  constructor(private renderer: Renderer2) { }

  ngOnInit() {

    console.log(this.contenido);
    this.observer = new IntersectionObserver((entries) => {

      entries.forEach((entry: any) => {

        if(entry.isIntersecting) {
          this.renderer.removeClass(this.contenido.nativeElement, 'no-scroll');

        } else {
          this.renderer.addClass(this.contenido.nativeElement, 'no-scroll');
        }
      });

    });

    this.observer.observe(this.triggerElement.nativeElement);
  }

}
