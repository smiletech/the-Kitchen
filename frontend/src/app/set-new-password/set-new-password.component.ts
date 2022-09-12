import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, FormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../services/user.service';


@Component({
  selector: 'app-set-new-password',
  templateUrl: './set-new-password.component.html',
  styleUrls: ['./set-new-password.component.scss']
})
export class SetNewPasswordComponent implements OnInit  {
  show=true
  hide = true;

  resetForm!:UntypedFormGroup;
  token :any;
  constructor(private formBuilder:UntypedFormBuilder,private toastr: ToastrService,private service:UserService,private router:Router,private activated:ActivatedRoute) { }

  ngOnInit(): void {


this.activated.queryParams.subscribe(data=>{
  this.token=data
  
  
  this.token=this.token.token
  console.log(this.token);

})
    this.resetForm = this.formBuilder.group({    
      confirmPassword: ['', [Validators.required]],
      password: ['', Validators.required],
    
    });
  }



  getErrorMessage() {
 
      return 'You must enter a value';
   
    
  }
 
  goToLogin(){
 this.router.navigate(["/login"])
  }
  resetPassword(){
    console.log(this.resetForm.value);
    this.service.resetPassword(this.token,{password:this.resetForm.value.password}).subscribe(data=>{
      if(!data){
        this.toastr.success('Please check your email....','Reset Passowrd Mail Send Successfully' );
        this.router.navigate(["/login"])
      }
    }, error => {
      // console.log(error);
      this.toastr.error('....', error.error.message);
    })
    
  }
}
