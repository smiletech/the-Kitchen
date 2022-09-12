import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService  {
  baseUrl: any = "http://localhost:8081/"
  imageUrl: any = "http://localhost:8081/images/"
    // baseUrl: any = ""
    // imageUrl: string = "images/"


  authUrl:any="auth"
  userUrl:any="users"
  dishUrl:any="dishs"
  orderUrl:any="orders"

  feedUrl:any="products"
  // Header:any={headers:{"":  JSON.parse(localStorage.getItem("token")!)}}
  constructor(private http: HttpClient) { }
// *********************************************************************************************************
//                                    USER API
// *********************************************************************************************************


getUser(){
  return this.http.get<any>(this.baseUrl+this.userUrl)
 }
 getOneUser(id:any){
  return this.http.get<any>(this.baseUrl+this.userUrl+"/"+id)
 }
 postVender(body:any){
   return this.http.post<any>(this.baseUrl+this.authUrl+"/registerVender",body)
 }

 postUser(body:any){
  return this.http.post<any>(this.baseUrl+this.authUrl+"/register",body)
}
 postGoogleUser(body:any){
  return this.http.post<any>(this.baseUrl+this.authUrl+'/google',body)
}
 loginUser(body:any){
  return this.http.post<any>(this.baseUrl+this.authUrl+"/login",body)
}
 deleteUser(body:any){
  return this.http.delete<any>(this.baseUrl+this.userUrl+"/"+body)
}
updateUser(id:any,body:any){
  return this.http.put<any>(this.baseUrl+this.userUrl+"/"+id,body)
}
updateUserWithPic(id:any,body:any){
  return this.http.patch<any>(this.baseUrl+this.userUrl+"/"+id,body)
}
updateUserWithoutPic(id:any,body:any){
  return this.http.patch<any>(this.baseUrl+this.userUrl+"/update/"+id,body)
}
saveFeed(id:any,body:any){
  return this.http.patch<any>(this.baseUrl+this.userUrl+"/savePost/"+id,body)
}
changePassword(id:any,body:any){
  return this.http.patch<any>(this.baseUrl+this.userUrl+"/changePassword/"+id,body)
}
forgotPassword(body:any){
  return this.http.post<any>(this.baseUrl+this.authUrl+"/forgot-Password",body)
}
resetPassword(token:any,body:any){
  return this.http.post<any>(this.baseUrl+this.authUrl+"/reset-Password?token="+token,body)
}
sendMail(token:any){
  return this.http.post<any>(this.baseUrl+this.authUrl+"/send-verification-email",{},{headers:{'Authorization':`Bearer ${token}`}})
}
verifyMail(token:any){
  return this.http.post<any>(this.baseUrl+this.authUrl+"/verify-email?token="+token,{})
}

// *********************************************************************************************************
//                                    DISH API
// *********************************************************************************************************
postDish(body:any){
  return this.http.post<any>(this.baseUrl+this.dishUrl+"/",body)
}
getDish(){
  return this.http.get<any>(this.baseUrl+this.dishUrl+"?sortBy=_id:desc&limit=100")
 }
 getOneDish(id:any){
  return this.http.get<any>(this.baseUrl+this.dishUrl+"/"+id)
}
deleteDish(id:any){
  return this.http.delete<any>(this.baseUrl+this.dishUrl+"/"+id)
}
updateDish(id:any,body:any){
  return this.http.patch<any>(this.baseUrl+this.dishUrl+"/"+id,body)
}
// *********************************************************************************************************
//                                    ORDER API
// *********************************************************************************************************
postOrder(body:any){
  return this.http.post<any>(this.baseUrl+this.orderUrl+"/",body)
}
getOrder(){
  return this.http.get<any>(this.baseUrl+this.orderUrl+"?sortBy=_id:desc&limit=50");
}

updateOrder(id:any,body:any){
  return this.http.patch<any>(this.baseUrl+this.orderUrl+"/"+id,body);
}
// *********************************************************************************************************
//                                    FEED API
// *********************************************************************************************************
getFeed(){
  return this.http.get<any>(this.baseUrl+this.feedUrl+"?sortBy=_id:desc&limit=50")
 }

 getFeedPagination(size:any){
  return this.http.get<any>(this.baseUrl+this.feedUrl+"?limit="+size)
 }
 getOneFeed(id:any){
  return this.http.get<any>(this.baseUrl+this.feedUrl+"/"+id)
 }
 postFeed(body:any){
   return this.http.post<any>(this.baseUrl+this.feedUrl,body)
 }

 deleteFeed(body:any){
  return this.http.delete<any>(this.baseUrl+this.feedUrl+"/"+body)
}
updateFeed(id:any,body:any){
  return this.http.put<any>(this.baseUrl+this.feedUrl+"/"+id,body)
}
likeFeed(id:any,body:any){
  return this.http.patch<any>(this.baseUrl+this.feedUrl+"/like/"+id,body)
}

commentFeed(id:any,body:any){
  return this.http.patch<any>(this.baseUrl+this.feedUrl+"/comment/"+id,body)
}
replyFeed(id:any,cId:any,body:any){
  return this.http.patch<any>(this.baseUrl+this.feedUrl+"/comment/"+id+"/reply/"+cId,body)
}
likeComment(id:any,cId:any){
  return this.http.patch<any>(this.baseUrl+this.feedUrl+"/comment/"+id+"/like/"+cId,{})
}
likeReply(id:any,cId:any,rId:any){
  return this.http.patch<any>(this.baseUrl+this.feedUrl+"/comment/"+id+"/reply/"+cId+"/like/"+rId,{})
}
showReply(id:any,cId:any){
  return this.http.patch<any>(this.baseUrl+this.feedUrl+"/comment/"+id+"/showReply/"+cId,{})
}



// *********************************************************************************************************
//                                  subject
// *********************************************************************************************************
private subject = new Subject<any>();
private subject1 = new Subject<any>();
private userSubject = new Subject<any>();
private orderSubject = new Subject<any>();


sendMessage(message: string) {
      this.subject.next(message);
  }
  sendMessageUser(message: string) {
    this.userSubject.next(message);
}
sendMessageOrder(message: string) {
  this.orderSubject.next(message);
}
  sendMessageToAddToCart(message: string) {
    this.subject1.next(message);
}

  // clearMessages() {
  //     this.subject.next();
  // }

  getMessage(): Observable<any> {
      return this.subject.asObservable();
  }
  getMessageUser(): Observable<any> {
    return this.userSubject.asObservable();
}
getMessageOrder(): Observable<any> {
  return this.orderSubject.asObservable();
}
  getMessageToAddToCart():Observable<any> {
    return this.subject1.asObservable();
}
}
