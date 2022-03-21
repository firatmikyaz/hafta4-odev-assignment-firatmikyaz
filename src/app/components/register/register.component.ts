import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup; //reactiveform için kullanıyoruz
  errorMessage: string;

  constructor(private router:Router,private dataService:UserService) { }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      firstName: new FormControl(null, [Validators.required, Validators.pattern('((?=.*[a-z])(?=.*[A-Z]).{3,20})')]),
      lastName: new FormControl(null, [Validators.required, Validators.pattern('((?=.*[a-z])(?=.*[A-Z]).{3,20})')]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.pattern('((?=.*[a-z])(?=.*[A-Z]).{6,30})'),
      ]),
    });
  }

  onSubmit(){
    if(this.registerForm.valid)
    {
      const userInfo = {
        firstName: this.registerForm.get('firstName').value,
        lastName: this.registerForm.get('lastName').value,
        email: this.registerForm.get('email').value,
        password: this.registerForm.get('password').value
      };

      this.dataService.postData(userInfo).subscribe((element) => {
        console.log(element);
        this.router.navigate(['/login'])
      });
    }
  }
  goLogin(){
    this.router.navigate(['/login']);
  }
}
