import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UserService } from 'src/app/services/user.service';
import { AddDishFormComponent } from '../add-dish-form/add-dish-form.component';


@Component({
  selector: 'app-add-dish',
  templateUrl: './add-dish.component.html',
  styleUrls: ['./add-dish.component.scss']
})
export class AddDishComponent implements AfterViewInit,OnInit {

constructor(private userService:UserService,public dialog: MatDialog){

}
dishs:any[]=[]
dataSource:any
currentUser:any={}
  ngOnInit(){
this.userService.getMessage().subscribe(res=>{
  if(res=='addDish'){
    // console.log(res);
    this.userService.getDish().subscribe(data=>{
      // console.log(data.results);
      
      this.dishs=data.results.reverse();
      this.dishs= this.dishs.filter(obj=>obj._vender._id==this.currentUser._id)
      this.dataSource = new MatTableDataSource<any>(this.dishs);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
   
    
  }
  
});
    (localStorage.getItem('currentUser'))?this.currentUser=JSON.parse(localStorage.getItem('currentUser')!):"";
    this.userService.getDish().subscribe(data=>{
      this.dishs=data.results.reverse();
      this.dishs= this.dishs.filter(obj=>obj._vender._id==this.currentUser._id)
      this.dataSource = new MatTableDataSource<any>(this.dishs);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
   
    
   
  }
  displayedColumns: string[] = ['name', 'photo','type', 'description','price','status','action'];

  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
 
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  delete(element:any){

    this.userService.deleteDish(element._id).subscribe(data=>{
      this.userService.getDish().subscribe(data=>{
        
        
        this.dishs=data.results.reverse();
        this.dishs= this.dishs.filter(obj=>obj._vender._id==this.currentUser._id)
        this.dataSource = new MatTableDataSource<any>(this.dishs);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      })
    })

  }
  openDialog() {
    const dialogRef = this.dialog.open(AddDishFormComponent);
  
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openDialogs(feed:any) {
    const dialogRef = this.dialog.open(AddDishFormComponent, {
      data: { name: feed },
      backdropClass: "bdrop"
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}



