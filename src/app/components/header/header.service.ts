import { Injectable, signal, WritableSignal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HeaderService {

  private readonly headerTitle: WritableSignal<string> = signal('');

  public getTitle(): string {
    return this.headerTitle();
  }

  public setTitle(title: string) {
    this.headerTitle.set(title);
  }
  
}