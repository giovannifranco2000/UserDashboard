import { Component, computed, inject, signal, WritableSignal } from '@angular/core';
import { HeaderService } from './header.service';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class HeaderComponent {

  private headerService = inject(HeaderService);

  protected headerTitle = computed(() => this.headerService.getTitle());
  protected showNavbar: WritableSignal<boolean> = signal(false);

  protected toggleNavbar(): void {
    this.showNavbar.update((value) => !value);
  }

}