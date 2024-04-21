import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { LoginService } from '@API/auth/login.service';
import { SessionService } from '@API/session.service';
import { LoginDTO } from '@interfaces/auth/login.interface';
import { LoginResponse, ServerResponse } from '@interfaces/shared.interface';
import { MatCardTitle } from '@angular/material/card';
import { PasswordInputComponent } from '@shared/components/password-input/password-input.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { FormHelperService } from '@shared/services/form-helper.service';
import { NotificationHandlerService } from '@shared/services/notification-handler.service';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, MatCardTitle, PasswordInputComponent, MatInputModule, MatFormFieldModule, MatButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  public router = inject(Router)
  public fb = inject(FormBuilder)
  public fh = inject(FormHelperService)
  public loginService = inject(LoginService)
  public sessionService = inject(SessionService)
  public notification = inject(NotificationHandlerService)
  private _router = inject(Router)

  public form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  })

  public login() {
    if (this.form.invalid) return this.form.markAllAsTouched()

    const body = this.form.value as LoginDTO
    this.loginService.create<LoginDTO, ServerResponse<LoginResponse>>(body).subscribe({
      next: ({ data, message }) => {
        if (!data) return;
        this.notification.createNotification({
          message: message,
          type: 'success'
        })
        this.sessionService.setSession(data)
        this._router.navigateByUrl('/app/product/list', { replaceUrl: true })
      },
    })
  }
}
