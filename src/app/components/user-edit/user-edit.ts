import { Component, computed, effect, inject, signal, Signal, WritableSignal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { User } from '../../core/user.interface';
import { UserService } from '../../core/user.service';
import { AlertComponent, Status } from '../alert/alert';
import { HeaderService } from '../header/header.service';

@Component({
  selector: 'app-user-edit',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    AlertComponent
  ],
  templateUrl: './user-edit.html',
  styleUrl: './user-edit.css',
})
export class UserEditComponent {

  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private headerService = inject(HeaderService);
  private userService = inject(UserService);
  private formBuilder = inject(FormBuilder);

  public user: Signal<User | undefined>;

  public editForm = this.formBuilder.group({
    name: [''],
    email: [''],
    phone: [''],
    website: ['']
  });

  public alertMessage: WritableSignal<string | null> = signal(null);
  public alertStatus: WritableSignal<Status> = signal('success');

  constructor() {
    const paramMap: Signal<ParamMap | undefined> = toSignal(this.activatedRoute.paramMap);
    const userId: Signal<number> = computed<number>(() => {
      const idString = paramMap()?.get('id');
      return idString ? Number.parseInt(idString, 10) : -1;
    });
    
    this.user = computed(() => this.userService.getUserById(userId())());

    effect(() => {
      this.headerService.setTitle(`${(this.user()?.name) ?? "User"}'s Profile Edit`);
      if(this.user()) {
        this.editForm.patchValue({
          name: this.user()!.name,
          email: this.user()!.email,
          phone: this.user()!.phone,
          website: this.user()!.website
        });
      }
    }, { allowSignalWrites: true });
  }

  public onSubmit() {
    if(this.editForm.valid && this.user()) {
      const updatedUser = { ...this.user()!, ...this.editForm.value as Partial<User> };
      this.userService.updateUser(updatedUser);
      this.alertMessage.set(`User ${updatedUser.name} saved successfully!`);
      this.alertStatus.set('success');
    } else {
      this.alertMessage.set('Form is invalid or user data is missing.');
      this.alertStatus.set('error');
    }
  }

  public onAlertClose(): void {
      this.alertMessage.set(null);
  }

}
