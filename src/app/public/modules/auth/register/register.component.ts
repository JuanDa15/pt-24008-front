import { LoginService } from '@API/auth/login.service';
import { RegisterService } from '@API/auth/register.service';
import { SessionService } from '@API/session.service';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { LoginDTO } from '@interfaces/auth/login.interface';
import { RegisterDTO } from '@interfaces/auth/register.interface';
import { LoginResponse, ServerResponse } from '@interfaces/shared.interface';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  public router = inject(Router)
  public registerService = inject(RegisterService)
  public loginService = inject(LoginService)
  public sessionService = inject(SessionService)
  private _router = inject(Router)
  public fb = inject(FormBuilder)
  public form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    name: ['', [Validators.required]],
    type: ['user', [Validators.required]]
  })

  public register() {
    if (this.form.invalid) return this.form.markAllAsTouched()

    const body = { ...this.form.value } as RegisterDTO

    this.registerService.create<RegisterDTO, ServerResponse>(body).subscribe({
      next: (resp) => {
        this.login({ email: body.email, password: body.password })
      }
    })
  }

  public login({ email, password }: LoginDTO) {
    this.loginService.create<LoginDTO, ServerResponse<LoginResponse>>({ email, password }).subscribe({
      next: ({ data }) => {
        if (!data) return;

        this.sessionService.setSession(data)
        this._router.navigateByUrl('/app/product/list', {
          replaceUrl: true
        })
      }
    })
  }
}
