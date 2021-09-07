import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { loginUser, registerUser } from 'src/app/core/store/actions/auth.action';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.sass']
})
export class AuthComponent implements OnInit {
  form: FormGroup;
  action: any;

  constructor(
    private store: Store,
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', [Validators.required,Validators.minLength(4)]]
    });
    this.route.queryParams.subscribe(p => this.action = p.action)
  }
  register() {
    const val = this.form.value;
    this.store.dispatch(registerUser({ username: val.email, password: val.password }))
  }

  login() {
    const val = this.form.value;
    this.store.dispatch(loginUser({ username: val.email, password: val.password }))
  }
  
  auth() {
    if (this.action === 'login') {
      this.login()
    } else {
      this.register()
    }
  }

  ngOnInit(): void {
  }
}
