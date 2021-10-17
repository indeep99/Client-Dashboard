import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, switchMap, tap } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt'
import { from, Observable, of } from 'rxjs';

export interface LoginForm {
  email: string;
  password: string;
}

export interface User {
  name?: string;
  username?: string;
  email?: string;
  passsword?: string;
  role?: string;
  // passwordConfirm?: string;
}

export const JWT_NAME = 'client-token';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) { }

  login(loginForm: LoginForm) {  
    return this.http.post<any>('/api/users/login', {email: loginForm.email, password: loginForm.password}).pipe(
      map((token) => {
        console.log('token');
        localStorage.setItem(JWT_NAME, token.access_token);
        return token;
      })
    )
  }

  register(user: User) {
    return this.http.post<any>('/api/users/', user).pipe(
      map(user => user)
    )
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem(JWT_NAME);
    return !this.jwtHelper.isTokenExpired(token!);
  }

  getUserId(): Observable<number>{
    return of(localStorage.getItem(JWT_NAME)).pipe(
      switchMap((jwt: string | any) => of(this.jwtHelper.decodeToken(jwt)).pipe(
        tap((jwt: any) => console.log(jwt)),
        map((jwt: any) => jwt.user.id))
      )
    )
  }

}
