import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';


interface SignupCredentials {
  username: string;
  password: string;
  passwordConfirmation: string; 
}

interface SignupResponse {
  username: string;
}

interface SignedResponse {
  authenticated: boolean;
  username: string;
}

interface SigninCredentials {}


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  rootUrl = 'https://api.angular-email.com'
  signedin$ = new BehaviorSubject(null);
 
  constructor(private http: HttpClient) { }

  usernameAvailable(username: string) {
    return this.http.post<{ available: boolean }>( `${this.rootUrl}/auth/username`,
            {username: username}
        );
    
  }

  signup(credentials: SignupCredentials) {
    return this.http.post<SignupResponse>(`${this.rootUrl}/auth/signup`,
            credentials
        ).pipe(
          tap(()=> {
            this.signedin$.next(true);
          })
        );
    
  }

  checkAuth() {
    return this.http.get<SignedResponse>(`${this.rootUrl}/auth/signedin`)
      .pipe(
        tap(({ authenticated })=>{
          this.signedin$.next(authenticated);
        })
      );
  }

  signout() {
    return this.http.post<any>(`${this.rootUrl}/auth/signout`, {})
      .pipe(
        tap(()=> {
          this.signedin$.next(false);
        })
      );
  }

  signin(credentials: SigninCredentials) {
    return this.http.post<any>(`${this.rootUrl}/auth/signin`, credentials)
      .pipe(
        tap(()=> {
          this.signedin$.next(true);
        })
      );
  }

}


