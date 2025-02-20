import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { login_details } from '../../interfaces/interfaces';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent{

  loginError:boolean = false
  loginSuccess:boolean = false
  error:string = ''

  @ViewChild('loginForm') loginForm!: NgForm

  constructor(private router:Router, private authService:AuthService){
    // setTimeout(() => {
    //   this.patchValue()
    // });
  }

  login(details:login_details){

    // console.log(details);
  
    this.authService.loginUser(details).subscribe(res=>{

      if(res.token){
        this.authService.checkDetails(res.token).subscribe(res=>{
          console.log(res.info?.id);

          if(res.info){
            this.loginSuccess = true

            this.authService.isLoggedIn = true

            localStorage.setItem('user_id', res.info.id)

            setTimeout(() => {
              this.loginSuccess = false
              if(res.info?.role == 'user'){
                this.router.navigate(['home', 'posts'])
              }else if(res.info?.role == 'admin'){
                this.router.navigate(['admin'])
              }
            }, 2000);
          }

          
        })
      }else if(res.error){
        this.loginError = true
        this.error = res.error as string

        setTimeout(() => {
          this.error = ''
          this.loginError = false
        }, 3000);
      }
      
    })
  }

  setValue(){
    this.loginForm.setValue({
      user:{
        email: 'abc@yopmail.com',
        password: '12345678'
      }
    })
  }

  patchValue(){
    this.loginForm.form.patchValue({
      user:{
        email: 'john@yopmail.com'
      }
    })
  }
}
