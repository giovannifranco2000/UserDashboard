import { Component, computed, effect, inject, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, ParamMap, RouterLink } from '@angular/router';
import { HeaderService } from '../header/header.service';
import { UserService } from '../../core/user.service';
import { User } from '../../core/user.interface';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './user-detail.html',
  styleUrl: './user-detail.css',
})
export class UserDetailComponent {

  private headerService = inject(HeaderService);
  private userService = inject(UserService);
  private activatedRoute = inject(ActivatedRoute);

  protected user: Signal<User | undefined>;

  constructor() {
    const paramMap: Signal<ParamMap | undefined> = toSignal(this.activatedRoute.paramMap);
    const userId: Signal<number> = computed<number>(() => {
      const idString = paramMap()?.get('id');
      return idString ? Number.parseInt(idString, 10) : -1;
    });
    
    this.user = computed(() => this.userService.getUserById(userId())());

    effect(() => {
      this.headerService.setTitle(`${(this.user()?.name) ?? "User"}'s Profile`);
    });
  }

}