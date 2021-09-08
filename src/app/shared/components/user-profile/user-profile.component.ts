import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { changeUserProfileAction } from 'src/app/core/store/actions/auth.action';

@Component({
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.sass']
})
export class UserProfileComponent implements OnInit {
  form!: FormGroup
  constructor(
    private fb: FormBuilder,
    private store: Store
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      username: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      age: new FormControl('', [Validators.required])
    })
  }
  changeUserProfileInfo() {
    let val = this.form.value
    this.store.dispatch(changeUserProfileAction(val))
  }

}
