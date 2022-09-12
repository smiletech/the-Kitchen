import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, FormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit{
  hide = true;
  forgotForm!:UntypedFormGroup;
  token :any;
  constructor(private toastr: ToastrService,private formBuilder:UntypedFormBuilder,private service:UserService,private router:Router) { }

  ngOnInit(): void {

    this.forgotForm = this.formBuilder.group({
      email: ['', [Validators.required,Validators.email]],
          
    });
  }


  getErrorMessage() {
   
      return 'You must enter a value';
    
  }
 
  goToLogin(){
 this.router.navigate(["/login"])
  }
  reset(){
    this.service.forgotPassword({email:this.forgotForm.value.email}).subscribe(data=>{
      if(!data) this.toastr.success('Please check your email....','Reset Passowrd Mail Send Successfully' );
    }, error => {
      // console.log(error);
      this.toastr.error('....', error.error.message);
    })
  }
}
