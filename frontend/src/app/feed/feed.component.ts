import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { AddNewPostComponent } from '../add-new-post/add-new-post.component';
import { UserService } from '../services/user.service';
import { ViewCommentComponent } from '../view-comment/view-comment.component';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit {

  toggled: boolean = true;
  bookmark: string = "bookmark_border"
  feeds: any[] = []
  imgUrl: any
  imgIterate: number[] = []
  currentUser: any;
  emojiCaption=""
  contentLoaded=false;
  constructor(private toastr: ToastrService,public dialog: MatDialog, private userService: UserService) { 
    this.appendItems();
  }
  listArray : string[] = [];
  sum = 20;
  direction = "";



  ngOnInit(): void {
    setTimeout(() => {
      this.contentLoaded = true;

  
    }, 3000);
  
    (localStorage.getItem("currentUser")) ? this.currentUser = JSON.parse(localStorage.getItem("currentUser")!) : ""
    console.log(this.currentUser);

    this.userService.getMessage().subscribe(data => {
      this.ngOnInit()
      this.imgUrl = this.userService.imageUrl
     this.userService.getFeed().subscribe(data => {
        console.log(data.results);
        this.feeds = data.results

        for (let i = 0; i < this.feeds.length; i++) {
          this.imgIterate.push(0);
        }
        // console.log(this.imgIterate);
     
   
      }, error => {
        // console.log(error);private toastr: ToastrService,
        this.toastr.error('....', error.error.message);
      });
    }, error => {
      // console.log(error);private toastr: ToastrService,
      this.toastr.error('....', error.error.message);
    });
    this.imgUrl = this.userService.imageUrl
    this.userService.getFeed().subscribe(data => {
      console.log(data.results);
      this.feeds = data.results

      for (let i = 0; i < this.feeds.length; i++) {
        this.imgIterate.push(0);
      }
      // console.log(this.imgIterate);
    }, error => {
      // console.log(error);private toastr: ToastrService,
      this.toastr.error('....', error.error.message);
    });



  }
  openAddPost(){
    const dialogRef = this.dialog.open(AddNewPostComponent, { panelClass: 'custom-dialog-container' });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }


  openDialog(feed:any) {
    const dialogRef = this.dialog.open(ViewCommentComponent, {
      data: { name: feed },
      backdropClass: "bdrop"
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  add(i: number) {
    this.imgIterate[i]++
  }
  sub(i: number) {
    this.imgIterate[i]--
  }
  savePost(feed: any) {


    this.userService.saveFeed(this.currentUser._id, { productId: feed._id }).subscribe(data => {
      this.userService.getOneUser(this.currentUser._id).subscribe(res => {
        console.log(res);

        this.currentUser = res;
        localStorage.setItem('currentUser', JSON.stringify(this.currentUser))
      
    }, error => {
      // console.log(error);private toastr: ToastrService,
      this.toastr.error('....', error.error.message);
    })
   
    }, error => {
      // console.log(error);private toastr: ToastrService,
      this.toastr.error('....', error.error.message);
    })


  }
  savenow(feed: any) {
    let a: any = false
    this.currentUser?.saved.find((data: any) => a = (data?._productId?._id == feed?._id) ? true : false)
    return a
  }

  likePost(feed: any) {


    this.userService.likeFeed(feed._id, {}).subscribe(data => {
      console.log(data);
      this.userService.getFeed().subscribe(data => { this.feeds = data.results ;
   
    }, error => {
      // console.log(error);private toastr: ToastrService,
      this.toastr.error('....', error.error.message);
    });
    
    }, error => {
      // console.log(error);private toastr: ToastrService,
      this.toastr.error('....', error.error.message);
    })



  }
  likenow(feed: any) {
    let a: any = false
    feed.like.find((data: any) => a = (data?._userId?._id == this.currentUser?._id) ? true : false)
    return a
  }
  handleSelection(event:any) {
    console.log(event.emoji.native);
   
    
    this.emojiCaption+=event.emoji.native
   
    
  }
  postComment(feed:any){
    
    this.userService.commentFeed(feed._id, {comment:this.emojiCaption}).subscribe(data => {
      console.log(data);
      this.emojiCaption=""
      this.toastr.success('click on message icon or view all comments....', "Comment Added Sucessfully!!");
      this.userService.getFeed().subscribe(data => { this.feeds = data.results ;
   
      }, error => {
        // console.log(error);private toastr: ToastrService,
        this.toastr.error('....', error.error.message);
      });
    
    }, error => {
      // console.log(error);private toastr: ToastrService,
      this.toastr.error('....', error.error.message);
    })
  }
  
  handleCarouselEvents(event:any) {
    console.log(event);
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
onScrollDown(ev: any) {
  console.log("scrolled down!!", ev);

  this.sum += 20;
  this.appendItems();
  
  this.direction = "scroll down";
}



appendItems() {
  this.addItems("push");
}



addItems(_method: string) {
  for (let i = 0; i < this.sum; ++i) {
    if( _method === 'push'){
      this.listArray.push([i].join(""));
    }
  }
}
}




