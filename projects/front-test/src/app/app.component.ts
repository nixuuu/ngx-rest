import { Component } from '@angular/core';
import { tap } from 'rxjs';
import { AuthService } from './auth.service';
import { UserListResponse } from './classes/UserListResponse';
import { SecondApiService } from './second-module/second-api.service';
import { UsersService } from './users.service';

const log = (msg: string) => tap((_) => console.log(msg));

@Component({
  selector: 'app-root',
  template: `<router-outlet></router-outlet>`,
  styles: []
})
export class AppComponent {
  title = 'front-test';

  constructor(
    private authService: AuthService,
    private user: UsersService,
    private second: SecondApiService
  ) {
    authService
      .login(1)
      .pipe(log('authService.login(1)'))
      .subscribe(console.log);

    user
      .list()
      .pipe(log('user.list()'))
      .subscribe((res) => {
        console.log('ArrayBuffer', res);
      });

    user.addUser().pipe(log('user.addUser()')).subscribe(console.log);
    second.get().pipe(log('second.get()')).subscribe(console.log);
    user.listAsync().then((sub) =>
      sub.subscribe((response: UserListResponse) => {
        console.log(response.getFirst());
      })
    );
  }
}
