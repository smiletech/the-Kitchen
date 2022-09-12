import { ChangeDetectorRef, Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { PostSavedComponent } from '../post-saved/post-saved.component';
import {  UserService } from '../services/user.service';
import { ViewlikeComponent } from '../viewlike/viewlike.component';


@Component({
  selector: 'app-view-comment',
  templateUrl: './view-comment.component.html',
  styleUrls: ['./view-comment.component.scss'],
  //  encapsulation: ViewEncapsulation.None,
})
export class ViewCommentComponent implements OnInit {
  
  constructor(public dialog: MatDialog,public dialogRef: MatDialogRef<HomeComponent>,
     public dialogRef1: MatDialogRef<PostSavedComponent>,
     @Inject(MAT_DIALOG_DATA) public feeds: {name: any}, private cf: ChangeDetectorRef,private formBuilder:UntypedFormBuilder,private service:UserService,private router:Router) { }
comment:any;
  imgBaseUrl=""

  urls: any[] = [];
  currentUser:any=[];
  savePost1=false
  toggled: boolean = false;
  temp=0;
  emojiCaption=""
  feed:any;
  like:boolean=false
  ngOnInit(): void {
    this.imgBaseUrl=this.service.imageUrl;
    (localStorage.getItem("currentUser"))?this.currentUser=JSON.parse(localStorage.getItem("currentUser")!):""

    console.log(this.currentUser);
this.feed=this.feeds.name
console.log(this.feed);

    
   }
   dec(){
    --this.temp
  }
  inc(){
    ++this.temp
  }

  
  postComment(feed:any){
    if(this.emojiCaption.includes("@")){

      let a =this.emojiCaption.replace("@", ""); 
     if(a.includes(this.comment._userId.name)){
      const reply = a.split(this.comment._userId.name, 2); 
      console.log(reply[1]);


      this.service.replyFeed(feed._id,this.comment._id, {comment:reply[1]}).subscribe((data:any ) => {
        console.log(data);
        this.emojiCaption=""
        this.service.getOneFeed(feed._id).subscribe((data:any)=>{
          console.log(data);
          this.feed=data        
        })
      })
               
     }
     else{
       alert("user not Matched");
     }
      
    }
    else{
    this.service.commentFeed(feed._id, {comment:this.emojiCaption}).subscribe((data:any ) => {
      console.log(data);
      this.emojiCaption=""
      this.service.getOneFeed(feed._id).subscribe((data:any)=>{
        console.log(data);
        this.feed=data        
      })
    })
    }
   
  }

  handleSelection(event:any){

    console.log(event.char);
    // console.log(this.post.value);emojiCaption=""
    
    this.emojiCaption+=event.emoji.native

  }
  savePost() {
    this.service.saveFeed(this.currentUser._id, { productId: this.feed._id }).subscribe((data:any ) => {
      this.service.getOneUser(this.currentUser._id).subscribe((res:any )=> {
        console.log(res);

        this.currentUser = res;
        localStorage.setItem('currentUser', JSON.stringify(this.currentUser))
        this.service.sendMessage("true")
      })
    })

  }
  savenow() {
    let a: any = false
    this.currentUser?.saved.find((data: any) => a = (data?._productId?._id == this.feed?._id) ? true : false)
    return a
  }

  likePost() {
    this.service.likeFeed(this.feed._id, {}).subscribe((data:any )=> {
      console.log(data);
      this.service.getOneFeed(this.feed._id).subscribe((data:any)=>{
        console.log(data);
        this.feed=data        
      })
      
    });
    this.service.sendMessage("true")
    
 



  }
  likenow() {
    let a: any = false
    this.feed.like.find((data: any) => a = (data._userId._id == this.currentUser?._id) ? true : false)
    return a
  }
  replyComment(fe:any){
    console.log(fe._userId.name);
   this.comment=fe
    this.emojiCaption="@"+fe._userId.name
  }

  openDialog(feed:any) {
    const dialogRef = this.dialog.open(ViewlikeComponent, {
      data: { name: feed },
      backdropClass: "bdrop"
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  likeComment(feed:any,fe:any){
 
    

    this.service.likeComment(feed._id,fe._id).subscribe(data=>{
      console.log(data);
      this.service.getOneFeed(this.feed._id).subscribe((data:any)=>{
        console.log(data);
        this.feed=data 
      })      

    })

  }
  likeComentnow(fe:any){
    let a: any = false
   fe.like.find((data: any) => a = (data._userId._id == this.currentUser?._id) ? true : false)
    return a
  }
  likeReply(feed:any,fe:any,f:any){

    this.service.likeReply(feed._id,fe._id,f._id).subscribe(data=>{
      console.log(data);
      this.service.getOneFeed(this.feed._id).subscribe((data:any)=>{
        console.log(data);
        this.feed=data 
      })      

    })

  }
  likeReplynow(f:any){
    let a: any = false
    f.like.find((data: any) => a = (data._userId._id == this.currentUser?._id) ? true : false)
     return a
  }
  showReply(feed:any,fe:any){

    this.service.showReply(feed._id,fe._id).subscribe(data=>{
      console.log(data);
      this.service.getOneFeed(this.feed._id).subscribe((data:any)=>{
        console.log(data);
        this.feed=data 
      })      

    })

  }


  showReplyNow(fe:any){
    return fe.show

  }
  calculateDiff(dateSent: Date){
    let currentDate = new Date();
    dateSent = new Date(dateSent);
    let val=""
    val=(currentDate.getDate()-dateSent.getDate()>=1)?currentDate.getDate()-dateSent.getDate()+" days ago":((currentDate.getTime()-dateSent.getTime()) /(1000 * 60 * 60)>=1)? Math.floor( (currentDate.getTime()-dateSent.getTime()) /(1000 * 60 * 60))+" hrs ago":((currentDate.getTime()-dateSent.getTime()) /(1000 * 60)>=1)?Math.floor((currentDate.getTime()-dateSent.getTime()) /(1000 * 60 ))+" mins ago":"Just Now";
    return val;
}

justNow(dateSent: Date){
  let currentDate = new Date();
    dateSent = new Date(dateSent);
    let val=""
    val=(Math.floor((currentDate.getTime()-dateSent.getTime()) /(1000 * 60 ))<=1)?"Just Now":"";
    return val;
}
}
