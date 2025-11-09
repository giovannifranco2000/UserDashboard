import { inject } from "@angular/core";
import { UserService } from "../core/user.service";
import { toObservable } from "@angular/core/rxjs-interop";
import { filter, map, take } from "rxjs";

export const userRouteGuard = () => {
    const userService = inject(UserService);

    if(userService.users().length > 0) return true;

    userService.fetchUsers();
    return toObservable(userService.users).pipe(
      filter(users => users.length > 0),
      take(1),
      map(() => true)
  );
};