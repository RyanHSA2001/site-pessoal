import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { LoginViewModel } from './login-viewmodel';
import { CommonModule } from '@angular/common';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  viewModel = new LoginViewModel();
  dadosInvalidos = false;

  constructor(private fb: FormBuilder, private loginService: LoginService) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      Usuario: [this.viewModel.Usuario, Validators.required],
      Senha: [this.viewModel.Senha, [Validators.required]],
    });
  }

  logar() {
    if (this.form.valid) {
      this.dadosInvalidos = false;
      this.viewModel = this.form.value;
      this.loginService.logar(this.viewModel).subscribe(
        (response: any) => {
          console.log('Logou', response);
        },
        (error) => {
          console.error('Erro', error);
        }
      );
    } else {
      this.dadosInvalidos = true;
    }
  }

  validarControl(controlName: string) {
    const control = this.form.get(controlName);
    return {
      'is-invalid': control?.invalid && control?.touched,
      'is-valid': control?.valid && control?.touched,
    };
  }
}
