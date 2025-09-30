import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ToastService, ToastMessage } from '../../services/toast.service';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CustomPasswordComponent } from '../custom-password/custom-password';
import { CustomToastComponent } from '../custom-toast/custom-toast';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    CustomPasswordComponent,
    CustomToastComponent
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  registerForm: FormGroup;
  loading = false;
  showRegister = false;
  toastMessages: ToastMessage[] = [];
  private toastSubscription: Subscription = new Subscription();

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastService: ToastService
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });

    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {
    this.toastSubscription = this.toastService.messages$.subscribe(
      messages => this.toastMessages = messages
    );
  }

  ngOnDestroy(): void {
    this.toastSubscription.unsubscribe();
  }

  onLogin(): void {
    if (this.loginForm.valid) {
      this.loading = true;
      this.authService.login(this.loginForm.value).subscribe({
        next: () => {
          this.toastService.success('Sucesso', 'Login realizado com sucesso!');
          setTimeout(() => {
            this.router.navigate(['/dashboard']);
          }, 1500);
        },
        error: (error) => {
          this.toastService.error('Erro', error.message || 'Erro ao fazer login');
          this.loading = false;
        }
      });
    } else {
      this.markFormGroupTouched(this.loginForm);
    }
  }

  onRegister(): void {
    if (this.registerForm.valid) {
      this.loading = true;

      this.authService.register(this.registerForm.value).subscribe({
        next: (response) => {
          this.loading = false;
          this.toastService.success('Sucesso', response.message || 'Conta criada com sucesso!');
          setTimeout(() => {
            this.registerForm.reset();
            this.showRegister = false;
          }, 1500);
        },
        error: (error) => {
          this.loading = false;
          this.toastService.error('Erro', error.error?.message || 'Erro ao criar conta');
        }
      });
    } else {
      this.markFormGroupTouched(this.registerForm);
    }
  }

  toggleForm(): void {
    this.showRegister = !this.showRegister;
    this.loginForm.reset();
    this.registerForm.reset();
  }

  onToastClose(messageId: string): void {
    this.toastService.close(messageId);
  }

  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      control?.markAsTouched();
    });
  }
}
