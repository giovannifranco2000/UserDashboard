import { Component, inject } from '@angular/core';
import { HeaderService } from '../header/header.service';
import { UserService } from '../../core/user.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-user-list',
  imports: [
    RouterLink
  ],
  templateUrl: './user-list.html',
  styleUrl: './user-list.css',
})
export class UserListComponent {

  public userService = inject(UserService);
  private headerService = inject(HeaderService);

  ngOnInit() {
    this.headerService.setTitle("Users");
    if(this.userService.users().length === 0) this.userService.fetchUsers();
  }

}
