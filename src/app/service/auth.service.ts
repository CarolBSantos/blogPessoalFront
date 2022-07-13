import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { user } from '../model/User';
import { userLogin } from '../model/UserLogin';


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

    getByIdUser(id: number): Observable<user>{
      return this.http.get<user>(`http://localhost:8080/usuarios/${id}`)
    }

    logado(){
      let ok: boolean = false

      if(environment.token != ''){
        ok = true
      }

      return ok
    }
    
  }
