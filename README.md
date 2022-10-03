# ngx-rest
[![codecov](https://codecov.io/gh/nixuuu/ngx-rest/branch/main/graph/badge.svg?token=JCYUPBXGC1)](https://codecov.io/gh/nixuuu/ngx-rest)

## Install
    
```bash
npm install @nixcode/ngx-rest
```

## Usage

```typescript
import { ApiClient, Get, JsonRequest } from 'ngx-rest';
import { Injectable } from '@angular/common';

@Injectable({ providedIn: 'root' })
@ApiClient({
    baseUrl: 'https://api.github.com',
    headers: {
      'Content-Type': 'application/json', 
      'Accept': 'application/json'
    }
})
export class GithubService {
    constructor(protected http: HttpClient) { }
    
    @Get('organizations')
    getOrganizations() {
        return new JsonRequest()
            .map(OrganizationsResponse);
    }
}
```

### Extending the service

  ```typescript
import { Injectable } from '@angular/common';
import { ApiClient, Get, JsonRequest } from 'ngx-rest';
import { GithubService } from './github.service';

@Injectable({ providedIn: 'root' })
@ApiClient('users')
export class GithubUsersService extends GithubService {
    constructor(http: HttpClient) { super(http); }
    
    @Get(':username')
    getUser(username: string) {
        return new JsonRequest()
            .params({ username })
            .map(UserResponse);
    }
    
    @Get(':username/repos')
    getRepos(username: string) {
        return new JsonRequest()
            .params({ username });
    }
}
  ```
