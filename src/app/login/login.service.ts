import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginViewModel } from './login-viewmodel';

@Injectable({
  providedIn: 'root', // Isso registra o serviço como um singleton no root do Angular
})
export class LoginService {
  private apiUrl = `http://localhost:8000/api/login`; // URL base para a API de usuários

  constructor(private http: HttpClient) {}

  logar(viewModel: LoginViewModel): Observable<any> {
    return this.http.post<any>(this.apiUrl, viewModel);
  }
}
