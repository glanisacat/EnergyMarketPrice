import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { MustMatch } from './_helpers/must-match.validator';
import { CrudService, CrudService1 } from '../service/crud.service'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent implements OnInit {

  
  checked = false;
  mobilePattern = /[0-9\+\-\ ]/;
  post: any = '';
  message: any;
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
    privacyPolicy: [false, Validators.requiredTrue],
  },
  {
    validator: MustMatch('password', 'confirmPassword'),
  });

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private crudservices: CrudService,
    private crudservice1: CrudService1
    ) { }
  
  ngOnInit(): void {
    this.createUser()
    console.log(this.myForm, 'this.myForm');
    
  }

  onSubmit(post:any) {
    this.post = post;
    window.open('./users');
  }

  createUser(){
    const userDetails = {
      name: this.myForm.value.name,
      surname: this.myForm.value.surname,
      email: this.myForm.value.email,
      phone: this.myForm.value.phone,
      password: this.myForm.value.password,
      confirmPassword: this.myForm.value.confirmPassword
    }

    let record: any = {};
    record['name'] = userDetails.name;
    record['surname'] = userDetails.surname;
    record['email'] = userDetails.email;
    record['phone'] = userDetails.phone;
    this.crudservice1.AddStudent(record)
    // this.crudservices.createUsers(record).then(res => {
    //   // userDetails.name = '';
    //   // userDetails.surname = '';
    //   // userDetails.email = '';
    //   // userDetails.phone = '';
    //   console.log(res, 'res');
    //   // this.message = 'User created success'
    // })
    
    localStorage.setItem('userDetails', JSON.stringify(userDetails))
    console.log(userDetails.surname, 'surname');
    
  }


}