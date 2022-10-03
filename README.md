# ngx-rest
[![codecov](https://codecov.io/gh/nixuuu/ngx-rest/branch/main/graph/badge.svg?token=JCYUPBXGC1)](https://codecov.io/gh/nixuuu/ngx-rest)

## Usage

  ```typescript
import { ApiClient, Get, JsonRequest } from 'ngx-rest';

@ApiClient({
    baseUrl: 'https://api.github.com', 
    headers: {
      'Content-Type': 'application/json', 
        'Accept': 'application/json'
    }
})
export class GithubService {
    constructor(protected http: HttpClient) { }
    
    @Get('/users/:username')
    getUser(username: string) {
        return new JsonRequest()
          .params({ username });
    }
}
  ```

### Extending the service

  ```typescript
import { ApiClient, Get, JsonRequest } from 'ngx-rest';
import { GithubService } from './github.service';

@ApiClient('users')
export class GithubUsersService extends GithubService {
    constructor(http: HttpClient) { super(http); }
    
    @Get(':username/repos')
    getRepos(username: string) {
        return new JsonRequest()
            .params({ username });
    }
}
  ```
