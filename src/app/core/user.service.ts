import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal, Signal, WritableSignal } from '@angular/core';
import { User } from './user.interface';
import { take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  private readonly apiUrl: string = "https://jsonplaceholder.typicode.com/users";
  
  private http = inject(HttpClient);
  
  private userSource: WritableSignal<User[]> = signal([]);
  public users: Signal<User[]> = computed(() => this.userSource());

  public fetchUsers(): void {
    this.http.get<User[]>(this.apiUrl)
        .pipe(take(1))
        .subscribe((users) => this.userSource.set(users));
  }

  public getUserById(id: number): Signal<User | undefined> {
    return computed(() => this.users().find((user) => user.id === id));
  }

  public updateUser(updatedUser: User): void {
    this.userSource.update(
      (users) => users.map((user) => user.id === updatedUser.id ? updatedUser : user)
    );
  }

}
