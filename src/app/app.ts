import { Component, effect, inject, Signal, signal } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './components/footer/footer';
import { HeaderComponent } from './components/header/header';
import { HeaderService } from './components/header/header.service';
import { ContainerComponent } from './containers/container/container';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    ContainerComponent,
    HeaderComponent,
    FooterComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  private titleService = inject(Title);
  private headerService = inject(HeaderService);

  protected readonly appTitle: Signal<string> = signal("Dashboard");

  constructor() {
    effect(() => {
      this.titleService.setTitle(`${this.appTitle()} | ${this.headerService.getTitle()}`);
    });
  }

}
