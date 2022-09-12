import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HeaderComponent } from '../common/header/header.component';

import { UserService } from '../services/user.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit  {
  hide = true;
  loginForm!:UntypedFormGroup;
  token :any;
  currentUser:any;
  constructor(private toastr: ToastrService,public dialogRef: MatDialogRef<HeaderComponent>,private formBuilder:UntypedFormBuilder,private service:UserService,private router:Router) { }

  ngOnInit(): void {
    (localStorage.getItem("currentUser"))?this.currentUser=JSON.parse(localStorage.getItem("currentUser")!):""
    this.loginForm = this.formBuilder.group({
     
      password: ['', Validators.required],
      newPassword: ['', Validators.required],

      checkNewPassword: ['', Validators.required],

    
    });
  }



  getErrorMessage() {
  
      return 'You must enter a value';
   
  }
 login(){

  if(this.loginForm.value.newPassword==this.loginForm.value.checkNewPassword){
   console.log(this.loginForm.value);
   this.service.changePassword(this.currentUser._id,{password:this.loginForm.value.password , newPassword:this.loginForm.value.newPassword }).subscribe(data=>{
     console.log(data);
     this.toastr.success('..',"Password Changed Sucesssfully")
   }, error => {
    // console.log(error);private toastr: ToastrService,
    this.toastr.error('....', error.error.message);
  })
   this.dialogRef.close()

}
else{
  this.toastr.error('....', "Password not Matched !!!");
}
}


}

