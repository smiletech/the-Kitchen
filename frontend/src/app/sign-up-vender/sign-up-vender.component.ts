import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, FormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-sign-up-vender',
  templateUrl: './sign-up-vender.component.html',
  styleUrls: ['./sign-up-vender.component.scss']
})
export class SignUpVenderComponent implements OnInit  {
  hide = true;
  show=false
  signUpForm!:UntypedFormGroup;
  token :any;
  constructor(private toastr: ToastrService,private formBuilder:UntypedFormBuilder,private auth:UserService,private router:Router) { }

  ngOnInit(): void {

    this.signUpForm = this.formBuilder.group({
      email: ['', [Validators.required,Validators.email]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      password: ['', Validators.required],
      shopName: ['', Validators.required],
    
    });
  }



  getErrorMessage() {
  
      return 'You must enter a value';
   
  }
 signup(){
   console.log(this.signUpForm.value);
   
  this.auth.postVender(this.signUpForm.value).subscribe((data:any)=>{
     this.signUpForm.reset()
     this.toastr.success('...', 'Successfully Signup! ');
     this.router.navigate(["/login"])
    
  }  ,(err)=>{
    console.log(err.error.message);
    this.toastr.error('....',err.error.message);
    });
  



    }


goToLogin(){
  this.router.navigate(["/login"])
   }
forgot(){
  this.router.navigate(['/forgotPassword'])
}
verify(){
  this.auth.sendMail(this.token).subscribe(data=>{

  })
}

}
