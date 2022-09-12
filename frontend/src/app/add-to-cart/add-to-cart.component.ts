import { AfterViewInit, Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Route, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AddAddressComponent } from '../add-address/add-address.component';
import { UserService } from '../services/user.service';
declare var Razorpay: any;
@Component({
  selector: 'app-add-to-cart',
  templateUrl: './add-to-cart.component.html',
  styleUrls: ['./add-to-cart.component.scss']
})

export class AddToCartComponent implements AfterViewInit, OnInit {

  constructor(private router:Router, private toastr: ToastrService,public dialog: MatDialog, private service: UserService) {

  }
  // currentUser:any=[];
   finalTotal: number=0;
   address=""
  dataSource: any
  arr: any[] = JSON.parse(localStorage.getItem("order")!);
  ngOnInit() {

(localStorage.getItem("order"))?"":this.arr=[]


    this.service.getMessageToAddToCart().subscribe((data)=>{
     this.address=data;
      this.paynow();

    })
    for (let i = 0; i < this.arr.length; i++) {
      if(this.arr[i].quantity!="Total Amount(₹)"){
     this.finalTotal = this.finalTotal + this.arr[i].total
    }
    }
  for (let i = 0; i < this.arr.length; i++) {
    if(this.arr[i].quantity=="Total Amount(₹)")
    {
      if(i!=this.arr.length-1)
      {
      this.arr.splice(i,1);
      this.arr.push({ "name": "", "photo": [{ "path": "" }], "description": "", "price": "", "quantity": "Total Amount(₹)", "total": this.finalTotal })
      }
    }
      if(this.arr[i].quantity!="Total Amount(₹)" && i==this.arr.length-1 ){
      this.arr.push({ "name": "", "photo": [{ "path": "" }], "description": "", "price": "", "quantity": "Total Amount(₹)", "total": this.finalTotal })

      }

  }
    // (this.arr.filter(obj=>obj.quantity=="Total Amount(₹)").length>0)?"":this.arr.push({ "name": "", "photo": [{ "path": "" }], "description": "", "price": "", "quantity": "Total Amount(₹)", "total": 0 });
    localStorage.setItem('order', JSON.stringify(this.arr))
       this.dataSource = new MatTableDataSource<any>(this.arr);

    console.log(this.dataSource);


  }
  displayedColumns: string[] = ['symbol', 'name', 'weight', 'price', 'sub', 'quentity', 'add', 'total', 'buttons'];


  dataNotFound = false;




  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  sub(element: any) {


    this.arr.filter(obj => {
      if (JSON.stringify(obj._id) == JSON.stringify(element._id)) {
        obj.quantity--;
        obj.total = obj.quantity * obj.price;
        this.finalTotal = this.finalTotal - obj.price;
      }
    });
    this.arr[this.arr.length-1].total=this.finalTotal

    this.dataSource = new MatTableDataSource<any>(this.arr);
    localStorage.setItem('order', JSON.stringify(this.arr))


  }
  add(element: any) {

    this.arr.filter(obj => {
      if (JSON.stringify(obj._id) == JSON.stringify(element._id)) {
        obj.quantity++;
        obj.total += JSON.parse(obj.price);
        this.finalTotal += JSON.parse(obj.price);
      }
    });
    this.arr[this.arr.length-1].total=this.finalTotal
    this.dataSource = new MatTableDataSource<any>(this.arr);
    localStorage.setItem('order', JSON.stringify(this.arr))


  }
  delete(element: any) {

    this.arr = JSON.parse(localStorage.getItem("order")!)

    this.finalTotal = this.finalTotal - (JSON.parse(element.price) * JSON.parse(element.quantity));

    this.arr[this.arr.length-1].total=this.finalTotal
    this.arr = this.arr.filter(obj => JSON.stringify(obj._id) != JSON.stringify(element._id));
    this.toastr.success('....', "Removed from cart");
    if(this.arr.length==1)this.arr=[]
    this.dataSource = new MatTableDataSource<any>(this.arr);
    localStorage.setItem('order', JSON.stringify(this.arr))
    this.service.sendMessage('order');



  }
  proceed() {
    let arr: any[] = []
    this.openDialog(arr)

    // this.paynow()

  }

  openDialog(feed:any) {
    const dialogRef = this.dialog.open(AddAddressComponent, {
      data: { name: feed },
      backdropClass: "bdrop"
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }


  message: any = "Not yet stared";
  paymentId = "";
  error = "";
  title = 'angular-razorpay-intergration';


  // rzp_live_BCuwa8w1sOWjPo
  // rzp_test_50qaiXf4yBpYyG
  options = {
    "key": "rzp_test_50qaiXf4yBpYyG",
    "amount": "2000",
    "name": "Asif Sayyed",
    "description": "Vender",
    "image": "https://ca.slack-edge.com/T0B4MLUM9-U02SFU3SS0K-c68b329728df-512",
    "order_id": "",
    "handler": function (response: any) {
      var event = new CustomEvent("payment.success",
        {
          detail: response,
          bubbles: true,
          cancelable: true
        }
      );
      window.dispatchEvent(event);
    },
    "prefill": {
      "name": "",
      "email": "",
      "contact": ""
    },
    "notes": {
      "address": ""
    },
    "theme": {
      "color": "#ff6600"
    }
  };

  paynow() {
    //JSON.stringify(JSON.parse(this.array[0].finalTotal)*100)
    this.paymentId = '';
    this.error = '';
    this.options.amount = JSON.stringify(this.finalTotal * 100); //paise
    this.options.prefill.name = "Asif";
    this.options.prefill.email = "asifsayyed1999@gmail.com";
    this.options.prefill.contact = "9673778533";
    var rzp1 = new Razorpay(this.options);
    rzp1.open();
    rzp1.on('payment.failed', function (response: any) {
      //this.message = "Payment Failed";
      // Todo - store this information in the server
      console.log(response.error.code);
      console.log(response.error.description);
      console.log(response.error.source);
      console.log(response.error.step);
      console.log(response.error.reason);
      console.log(response.error.metadata.order_id);
      console.log(response.error.metadata.payment_id);
      //this.error = response.error.reason;
    }
    );
  }
  @HostListener('window:payment.success', ['$event'])
  onPaymentSuccess(event: any): void {
    this.message = "Success Payment";
    this.toastr.success('....',"Payment Completed Successfully ");

    this.arr.pop()
let order={
  address:this.address,
  razorpay_payment_id:event.detail.razorpay_payment_id,
  finalTotal:""+this.finalTotal,
  dishs:this.arr

}
this.service.postOrder(order).subscribe(data=>{
  console.log(data);

})
this.arr=[];
   localStorage.setItem('order',JSON.stringify(this.arr));
   this.router.navigate(["showUserOrders"])
   this.service.sendMessage('order')
    // console.log(order);


  }



}
