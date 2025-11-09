import { Component, inject } from '@angular/core';
import { HeaderService } from '../header/header.service';
import { UserService } from '../../core/user.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './user-list.html',
  styleUrl: './user-list.css',
})
export class UserListComponent {

  public userService = inject(UserService);
  private headerService = inject(HeaderService);

  constructor() {
    this.headerService.setTitle("Users");
  }

}
