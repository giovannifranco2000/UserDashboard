import { NgClass } from '@angular/common';
import { Component, input, InputSignal, output, OutputEmitterRef } from '@angular/core';

export type Status = 'success' | 'error';

@Component({
  selector: 'app-alert',
  imports: [
    NgClass
  ],
  templateUrl: './alert.html',
  styleUrl: './alert.css',
})
export class AlertComponent {

  public message: InputSignal<string | null> = input<string | null>(null);
  public status: InputSignal<Status> = input<Status>('success');

  public close: OutputEmitterRef<void> = output<void>();

}
