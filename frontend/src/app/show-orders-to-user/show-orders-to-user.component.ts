import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../services/user.service';
@Component({
  selector: 'app-show-orders-to-user',
  templateUrl: './show-orders-to-user.component.html',
  styleUrls: ['./show-orders-to-user.component.scss']
})
export class ShowOrdersToUserComponent implements AfterViewInit,OnInit {
  currrntUser:any
   orders:any[]=[]
   dataSource: any
  constructor(private toastr: ToastrService,public dialog: MatDialog, private userService: UserService)
  { 
    
  }
  ngOnInit(){
    (localStorage.getItem("currentUser"))?this.currrntUser=JSON.parse(localStorage.getItem("currentUser")!):"";
   this.userService.getOrder().subscribe(data=>{
     data=data.results.filter((obj:any)=>obj._user._id==this.currrntUser._id);
     this.orders=data;
     console.log(this.orders);
   this.dataSource = new MatTableDataSource<any>(this.orders);
   this.dataSource.paginator = this.paginator;
   this.dataSource.sort = this.sort;
   })

  
  }
  displayedColumns: string[] = [ 'transactionId', 'dishs', 'finalTotal','status'];
  

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

}



