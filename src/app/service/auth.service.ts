import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { user } from '../model/user';
import { userLogin } from '../model/userLogin';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient
  ) { }

    entrar (userLogin: userLogin): Observable<userLogin>{
      return this.http.post<userLogin>('http://localhost:8080/usuarios/logar', userLogin)
    }

    cadastrar (user: user): Observable<user>{
      return this.http.post<user>('http://localhost:8080/usuarios/cadastrar', user)

    }
    
  }
