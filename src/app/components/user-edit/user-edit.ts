import { Component, computed, effect, inject, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { UserService } from '../../core/user.service';
import { HeaderService } from '../header/header.service';
import { User } from '../../core/user.interface';

@Component({
  selector: 'app-user-edit',
  standalone: true,
  imports: [
    ReactiveFormsModule
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
      this.router.navigate(['/users', this.user()!.id]);
    }
  }

}
