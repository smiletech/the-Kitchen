import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, FormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
// import { stringify } from 'querystring';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { GoogleLoginProvider, SocialAuthService } from 'angularx-social-login';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  hide = true;
  show = false
  loginForm!: UntypedFormGroup;
  token: any;
  googleUser: any
  constructor(private socialAuthService: SocialAuthService, private toastr: ToastrService, private formBuilder: UntypedFormBuilder, private auth: UserService, private router: Router) { }

  ngOnInit(): void {

    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],

    });
  }



  getErrorMessage() {

    return 'You must enter a value';

  }
  login() {
    //  console.log(this.loginForm.value);

    this.auth.loginUser(this.loginForm.value).subscribe((data: any) => {
      this.token = data.token;

      console.log(data);

      if (data.user.isEmailVerified) {
        localStorage.setItem('token', JSON.stringify(this.token));

        this.auth.getOneUser(data.user._id).subscribe(res => {
          console.log(res);

          localStorage.setItem('currentUser', JSON.stringify(res));
          this.auth.sendMessageUser("data");

        });

        this.toastr.success('Welcome', 'Successfully Login! ');

        this.router.navigate(['']);
        // this.toastr.success("Logged in successfully !!",data.message  )
      }
      else {
        // alert("Please Verify your Email  !!!")
        this.toastr.warning('....', 'Please Verify your Email!');
        this.show = true
      }

    }, error => {
      // console.log(error);
      this.toastr.error('....', error.error.message);
    })

  }

  goToLogin() {
    this.router.navigate(["/signup"])
  }
  forgot() {
    this.router.navigate(['/forgotPassword'])
  }
  verify() {
    this.toastr.success('Please check your email....', 'Verification Mail Send Successfully');
    this.auth.sendMail(this.token).subscribe(data => {

    })
  }
  signupWithGoogle() {
    this.socialAuthService?.signIn(GoogleLoginProvider.PROVIDER_ID)
      .then((res: any) => {
        console.log(res);

        this.googleUser = res
        let user = {
          firstName: this.googleUser.firstName,
          lastName: this.googleUser.lastName,
          email: this.googleUser.email,
          password: this.googleUser.firstName + "@123456",
        }

        this.auth.postGoogleUser(user).subscribe(data => {
          console.log(data);




          this.auth.loginUser({ email: this.googleUser.email, password: this.googleUser.firstName + "@123456", }).subscribe((data: any) => {
            this.token = data.token;

            console.log(data);

            if (data.user.isEmailVerified) {
              localStorage.setItem('token', JSON.stringify(this.token));

              this.auth.getOneUser(data.user._id).subscribe(res => {
                console.log(res);
                localStorage.setItem('currentUser', JSON.stringify(res));
                this.auth.sendMessageUser("data");

              }, (error) => {
                // console.log(error.error.message);
                this.toastr.error('....', error.error.message);
              })
              this.toastr.success('Welcome', 'Successfully Login! ');
              this.router.navigate(['']);
              // this.toastr.success("Logged in successfully !!",data.message  )
            }
            else {
              // alert("Please Verify your Email  !!!")
              this.toastr.warning('....', 'Please Verify your Email!');
              this.show = true
            }

          }, (error) => {
            // console.log(error.error.message);
            this.toastr.error('....', error.error.message);
          })
        })

      })





  }
}
