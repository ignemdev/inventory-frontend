import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-usuario-register',
  templateUrl: './usuario-register.component.html',
  styleUrls: ['./usuario-register.component.css']
})

export class UsuarioRegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(
    public fb: FormBuilder,
    public authService: AuthService,
    public router: Router,
    public toastr: ToastrService
  ) {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  ngOnInit(): void { }

  registerUsuario() {
    this.authService.signUp(this.registerForm.value).subscribe((res: any) => {
      if (res.hasError) {
        this.toastr.error(res.errorMessage, 'Operacion Fallida');
        return;
      }

      this.registerForm.reset();
      this.router.navigate(['login']);
    });
  }

  checkInvalidInput(field: string): boolean | undefined {
    return this.registerForm.get(field)?.invalid &&
      (this.registerForm.get(field)?.dirty ||
        this.registerForm.get(field)?.touched)
  }
}
