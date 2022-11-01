import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MustMatch } from './_helpers/must-match.validator';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent implements OnInit {
  checked = false;
  mobilePattern = /[0-9\+\-\ ]/;
  post: any = '';

  myForm: FormGroup = this.formBuilder.group({
    name: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(50)])],
    surname: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(50)])],
    email: ['', Validators.compose([Validators.required, Validators.email])],
    phone: ['', Validators.compose([Validators.required, Validators.pattern(this.mobilePattern)])],
    password: ['', [
      Validators.required,
      Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/),
    ]],
    confirmPassword: ['', Validators.required],
    privacyPolicy: ['', Validators.required],
  },
  {
    validator: MustMatch('password', 'confirmPassword'),
  });

  constructor(private formBuilder: FormBuilder) { }
  
  ngOnInit(): void {
    
  }

  onSubmit(post:any) {
    this.post = post;
  }

}