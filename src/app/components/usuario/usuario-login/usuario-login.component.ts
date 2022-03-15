import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-usuario-login',
  templateUrl: './usuario-login.component.html',
  styleUrls: ['./usuario-login.component.css']
})
export class UsuarioLoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    public fb: FormBuilder,
    public authService: AuthService,
    public router: Router,
    public toastr: ToastrService
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  ngOnInit() { }

  loginUsuario() {
    this.authService.signIn(this.loginForm.value).subscribe((res: any) => {
      if (res.hasError) {
        this.toastr.error(res.errorMessage, 'Operacion Fallida');
        return;
      }

      const { data } = res;
      localStorage.setItem('access_token', data.token);
      localStorage.setItem('user_name', data.username);
      this.router.navigate(['productos']);
    });
  }

  checkInvalidInput(field: string): boolean | undefined {
    return this.loginForm.get(field)?.invalid &&
      (this.loginForm.get(field)?.dirty ||
        this.loginForm.get(field)?.touched)
  }
}
