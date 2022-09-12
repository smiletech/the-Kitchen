import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../services/user.service';
import { ViewCommentComponent } from '../view-comment/view-comment.component';

@Component({
  selector: 'app-post-saved',
  templateUrl: './post-saved.component.html',
  styleUrls: ['./post-saved.component.scss']
})
export class PostSavedComponent implements OnInit {
  feeds:any[]=[]
  imgUrl:any
  imgIterate:number[]=[]
  currentUser:any;
    constructor(public dialog: MatDialog,private toastr: ToastrService,private userService:UserService) { }

  ngOnInit(): void {

 
    (localStorage.getItem("currentUser"))?this.currentUser=JSON.parse(localStorage.getItem("currentUser")!):""
console.log(this.currentUser);

 
    this.imgUrl=this.userService.imageUrl
    this.feeds=this.currentUser.saved 
    this.feeds=this.feeds.reverse()
    console.log(this.feeds);
    
    // this.userService.getFeed().subscribe(data=>{
    //   console.log(data.results);
     

    //   for (let i = 0; i < this.feeds.length; i++) {       
    //     this.imgIterate.push(0);        
    //   }
    //   console.log( this.imgIterate);
    //   })
  }

  openDialog(feed:any) {
console.log(feed._productId._id);
let a:any
    this.userService.getOneFeed(feed._productId._id).subscribe(res=>{
  
     a=res;
     console.log(a);
     const dialogRef = this.dialog.open(ViewCommentComponent, {
      data: { name: a },
      backdropClass: "bdrop"
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
      
    }, error => {
      // console.log(error);
      this.toastr.error('....', error.error.message);
    })
    this.dilogOpen(a)

  }

  dilogOpen(res:any){
   
  }

}
