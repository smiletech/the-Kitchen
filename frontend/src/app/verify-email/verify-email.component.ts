import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.scss']
})
export class VerifyEmailComponent implements OnInit {

  constructor(private toastr: ToastrService,private service:UserService,private active:ActivatedRoute,private router:Router) { }
  token:any
  ngOnInit(): void {

    this.active.queryParams.subscribe(data=>{
      this.token=data  
      this.token=this.token.token
      console.log(this.token);
    
    })

    this.service.verifyMail(this.token).subscribe(data=>{
      (!data)? this.toastr.success('Please login now....','Email Verified Sucessfully!!' ): this.toastr.error('try again....',"Something Went Wrong!!");


      this.router.navigate(['/login'])
    }, error => {
      // console.log(error);
      this.toastr.error('....', error.error.message);
    })
  }

}
