import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AddNewPostComponent } from 'src/app/add-new-post/add-new-post.component';
import { ChangePasswordComponent } from 'src/app/change-password/change-password.component';

import { ProfileComponent } from 'src/app/profile/profile.component';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
   
})
export class HeaderComponent implements OnInit {
  constructor(public dialog: MatDialog,private userService:UserService,private router:Router) { }
currrntUser:any
imageUrl=""
order:number=0
nav:any
  ngOnInit(): void {
  this.nav=this.router
this.userService.getMessageUser().subscribe(data=>{
  this.currrntUser  =localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')!):"";
console.log(this.currrntUser);
    // (localStorage.getItem("currentUser"))?this.currrntUser=JSON.parse(localStorage.getItem("currentUser")!):"";
    (this.currrntUser?.photo)?this.imageUrl=this.userService.imageUrl+this.currrntUser.photo:""

})


  if(localStorage.getItem("order"))
  this.order=JSON.parse(localStorage.getItem("order")!).length
     this.userService.getMessage().subscribe(data=>{
        
    if(data=="order"){
      let a:any[]=JSON.parse(localStorage.getItem("order")!);

      (a.filter(obj=>obj.quantity=="Total Amount(₹)").length>0)?this.order=JSON.parse(localStorage.getItem("order")!).length-1:this.order=JSON.parse(localStorage.getItem("order")!).length}
  
    if(data=='true')this.ngOnInit();

});
this.currrntUser  =localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')!):"";
console.log(this.currrntUser);
    // (localStorage.getItem("currentUser"))?this.currrntUser=JSON.parse(localStorage.getItem("currentUser")!):"";
    (this.currrntUser?.photo)?this.imageUrl=this.userService.imageUrl+this.currrntUser.photo:""

    let a:any[]=[]
    a=JSON.parse(localStorage.getItem("order")!);
 if(a)(a.filter((obj:any)=>obj.quantity=="Total Amount(₹)").length>0)?this.order=JSON.parse(localStorage.getItem("order")!).length-1:this.order=JSON.parse(localStorage.getItem("order")!).length

// this.userService.getOneUser(this.currrntUser._id).subscribe(data=>{

// })

}


  openDialog() {
    const dialogRef = this.dialog.open(ProfileComponent);
  
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  openDialogChangePassword() {
    const dialogRef = this.dialog.open(ChangePasswordComponent);
  
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }


  openAddPost(){
    const dialogRef = this.dialog.open(AddNewPostComponent, { panelClass: 'custom-dialog-container' });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  openSavedPost(){
    this.router.navigate(["savedPost"]);  
  }
  openaddToCart(){
    this.router.navigate(["addToCart"]);  
  }
  openVenderOrder(){
    this.router.navigate(["showVenderOrders"]);  
  }

  
  openhome(){
    this.userService.sendMessage("home");
    this.router.navigate([""]);
  
     

  }
  openFeed(){
    this.router.navigate(["feed"]);
  }
  clear(){
    localStorage.clear()

    this.router.navigate(["login"])
  }
 scrollOrderNow(){
  this.router.navigate(['showUserOrders'])
 }

scrollDish(){
  this.router.navigate(['dish'])
 }
  }
  
