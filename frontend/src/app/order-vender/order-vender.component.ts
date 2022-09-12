import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user.service';
import { AddDishFormComponent } from '../add-dish-form/add-dish-form.component';


@Component({
  selector: 'app-order-vender',
  templateUrl: './order-vender.component.html',
  styleUrls: ['./order-vender.component.scss']
})
export class OrderVenderComponent implements OnInit {
  currentUser:any
  filterValue:any=""
  select:any[]=['pending','cooking','completed','cancelled']
   orders:any[]=[]
   dataSource: any
  constructor(private toastr: ToastrService,public dialog: MatDialog, private userService: UserService, private active:ActivatedRoute)
  { 
    
  }
  ngOnInit(){
this.active.params.subscribe(data=>{
console.log(data);
this.filterValue=data;
this.filterValue=this.filterValue.id;
});
    (localStorage.getItem("currentUser"))?this.currentUser=JSON.parse(localStorage.getItem("currentUser")!):"";
  
    this.userService.getOrder().subscribe(data=>{
    
    this.orders=data.results;
    console.log(this.orders);
    this.orders=this.orders.map((obj:any)=>{
      return ({
        ...obj,
        dishs: obj.dishs.filter((dish:any) => dish._vender._id === this.currentUser._id) 
      })
     });
     this.orders=this.orders.filter((data:any)=>data.dishs.length!=0) 
     console.log(this.orders);
   this.dataSource = new MatTableDataSource<any>(this.orders);
   this.dataSource.paginator = this.paginator;
   this.dataSource.sort = this.sort;
  //  this.filterValue="pending";
   this.dataSource.filter = this.filterValue.trim().toLowerCase();

   if (this.dataSource.paginator) {
     this.dataSource.paginator.firstPage();
   }
   })

  
  }
  displayedColumns: string[] = [ 'name','transactionId','address', 'dishs','status'];
  

  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  // ngAfterViewInit() {
  //   this.dataSource.paginator = this.paginator;
  //   this.dataSource.sort = this.sort;
  // }

  applyFilter(event: Event) {
  this.filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = this.filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  selectStatus(id:any,event:any){
console.log(event);

this.userService.updateOrder(id,{status:event.value}).subscribe(data=>{
  console.log(data);
  
})

}
}



