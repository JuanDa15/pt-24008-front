import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { LoginService } from '@API/auth/login.service';
import { SessionService } from '@API/session.service';
import { LoginDTO } from '@interfaces/auth/login.interface';
import { LoginResponse, ServerResponse } from '@interfaces/shared.interface';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  public router = inject(Router)
  public fb = inject(FormBuilder)
  public loginService = inject(LoginService)
  public sessionService = inject(SessionService)
  private _router = inject(Router)

  public form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  })

  public login() {
    if (this.form.invalid) return this.form.markAllAsTouched()

    const body = this.form.value as LoginDTO
    this.loginService.create<LoginDTO, ServerResponse<LoginResponse>>(body).subscribe({
      next: ({ data }) => {
        if (!data) return;

        this.sessionService.setSession(data)
        this._router.navigateByUrl('/app/product/list', { replaceUrl: true })
      },
    })
  }
}
