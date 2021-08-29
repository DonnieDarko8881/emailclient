import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router
    ) { }

  ngOnInit(): void {
  }

  authForm = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
      Validators.pattern(/^[a-z0-9]+$/) 
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(20)
    ])
  });

  onSubmit(){
    if (this.authForm.invalid) {
      return;
    }
    console.log(this.authForm.value);
    this.authService.signin(this.authForm.value)
      .subscribe({
        next: (response) => {
          this.router.navigateByUrl('/inbox');
        },
        error: ({error}) => {
            if (error.username || error.password ){
            this.authForm.setErrors({credentials: true});
            }
        }

      });
  }
}
