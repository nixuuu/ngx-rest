import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { SecondApiService } from './second-module/second-api.service';
import { UsersService } from './users.service';

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
    authService.login(1).subscribe(console.log);

    user.list().subscribe(console.log);

    user.addUser({ name: 'test' }).subscribe(console.log);
    second.get().subscribe(console.log);
    user.listAsync().then((sub) => sub.subscribe(console.log));
  }
}
