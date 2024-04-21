import { LoginService } from '@API/auth/login.service';
import { RegisterService } from '@API/auth/register.service';
import { SessionService } from '@API/session.service';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardTitle } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import { LoginDTO } from '@interfaces/auth/login.interface';
import { RegisterDTO } from '@interfaces/auth/register.interface';
import { LoginResponse, ServerResponse } from '@interfaces/shared.interface';
import { PasswordInputComponent } from '@shared/components/password-input/password-input.component';
import { FormHelperService } from '@shared/services/form-helper.service';
import { NotificationHandlerService } from '@shared/services/notification-handler.service';
import { equalPassword } from '@shared/validators/equal-passwords';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, MatCardTitle, MatFormFieldModule, MatInputModule, PasswordInputComponent, MatButtonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {
  public router = inject(Router)
  public fh = inject(FormHelperService)
  public registerService = inject(RegisterService)
  public loginService = inject(LoginService)
  public sessionService = inject(SessionService)
  public notification = inject(NotificationHandlerService)
  private _router = inject(Router)
  public fb = inject(FormBuilder)
  public form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.pattern(/^(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}|:<>?~=\\[\]\\;',./-]).{6,}$/)]],
    confirmPassword: ['', [Validators.required]],
    name: ['', [Validators.required]],
    type: ['user', [Validators.required]]
  }, {
    validators: [equalPassword('password', 'confirmPassword')]
  })

  ngOnInit(): void {
    const isAdminRegister = this._router.url.includes('admin')
    if (isAdminRegister) {
      this.form.get('type')?.setValue('admin')
    }
  }
  public register() {
    if (this.form.invalid) return this.form.markAllAsTouched()

    let body = { ...this.form.value };
    delete body.confirmPassword;

    this.registerService.create<RegisterDTO, ServerResponse>(body as RegisterDTO).subscribe({
      next: (resp) => {
        this.notification.createNotification({
          message: resp.message,
          type: 'success'
        })
        this.login({ email: body.email!, password: body.password! })
      }
    })
  }

  public login({ email, password }: LoginDTO) {
    this.loginService.create<LoginDTO, ServerResponse<LoginResponse>>({ email, password }).subscribe({
      next: ({ data, message }) => {
        if (!data) return;
        this.notification.createNotification({
          message: message,
          type: 'success'
        })
        this.sessionService.setSession(data)
        this._router.navigateByUrl('/app/product/list', {
          replaceUrl: true
        })
      }
    })
  }
}
