import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { json } from 'express';
import { ToastrService } from 'ngx-toastr';
import { ViewDishComponent } from '../view-dish/view-dish.component';
import { ProfileComponent } from '../profile/profile.component';
import { UserService } from '../services/user.service';
import { ViewCommentComponent } from '../view-comment/view-comment.component';
import { Chart, ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

import {default as Annotation} from 'chartjs-plugin-annotation';
import { Router } from '@angular/router';
// import {DataLabelsPlugin} from 'chartjs-plugin-datalabels';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  // encapsulation: ViewEncapsulation.None,

})


export class HomeComponent implements OnInit {
  feed:any[]=[]
  dishs:any[]=[]
  imgUrl:any
  orders:any=[]
  pending:any
  cooking:any
  completed:any
  cancelled:any
  color: ThemePalette="accent"
  imgIterate:number[]=[]
  currentUser:any;
  temp:any[]=[]
    constructor(public dialog: MatDialog,private toastr: ToastrService,private userService:UserService, private router:Router) {
      Chart.register(Annotation)
    }

    @ViewChild("order") order!: HTMLElement;
  ngOnInit(): void {

    this.userService.getMessageUser().subscribe(data=>{
      this.currentUser=(localStorage.getItem('currentUser'))?JSON.parse(localStorage.getItem('currentUser')!):"";


    })

    this.currentUser=(localStorage.getItem('currentUser'))?JSON.parse(localStorage.getItem('currentUser')!):"";
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
  //  for (let i = 0; i < this.orders.length; i++)(this.orders[i].dishs.length==0)?this.orders.splice(i,1):"";


   console.log(this.orders);
   this.pending=this.orders.filter((data:any)=>data.status=='pending').length
   this.cooking=this.orders.filter((data:any)=>data.status=='cooking').length
   this.completed=this.orders.filter((data:any)=>data.status=='completed').length
   this.cancelled=this.orders.filter((data:any)=>data.status=='cancelled').length

 })



this.userService.getDish().subscribe(data=>{
  console.log(data.results);
  this.dishs=data.results;
  this.dishs.forEach((a: any) => {
    Object.assign(a, { quantity: 1, total: a.price });
  });
  this.temp=this.dishs
})
    this.userService.getMessage().subscribe(data=>{
if(data=='order'){
 let element = document.getElementById('order') as HTMLElement;
 element.scrollIntoView({behavior: 'smooth'})
}
if(data=='home'){
  // let element = document.getElementById('home') as HTMLElement;
  // element.scrollIntoView({behavior: 'smooth'})
  window.scroll(0,0);
}


  });
    this.feed=[
      {
        path:"../../../assets/images/bannerKitchen.png",
      },
      {
        path:"../../../assets/images/bannerKitchen2.png",
      },
      {
        path:"../../../assets/images/banner.png",
      },
      {
        path:"../../../assets/images/banner1.jpg",
      },

      {
        path:"../../../assets/images/banner2.jpg",
      },
      {
        path:"../../../assets/images/banner3.jpg",
      }
    ]

for (let i = 0; i < 7; i++) {


  const yesterday = new Date(this.date)
  yesterday.setDate(yesterday.getDate() - i)
  var dd = String(yesterday.getDate()).padStart(2, '0');
var mm = String(yesterday.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = yesterday.getFullYear();
let today = dd + '/' + mm + '/' + yyyy;
  // yesterday.toDateString()
  this.barChartLabels.unshift(today)

}

  }
  goToBottom(){
    window.scrollTo(0,document.body.scrollHeight);
  }
  scroll(el: HTMLElement) {
    // el.scrollIntoView();
    console.log(el);

    el.scrollIntoView({behavior: 'smooth'});
}
 a:any[]=[]
addToCart(dish:any){
  this.a=JSON.parse(localStorage.getItem("order")!);
   (this.a==null)?this.a=[]:"";


   (this.a.filter((obj)=>JSON.stringify(obj._id)==JSON.stringify(dish._id)).length>0)?
this.a.filter((obj)=>JSON.stringify(obj._id)==JSON.stringify(dish._id)?obj.quantity++:""):this.a.push(dish);

(this.a.filter((obj)=>JSON.stringify(obj._id)==JSON.stringify(dish._id)).length>0)?
this.a.filter((obj)=>JSON.stringify(obj._id)==JSON.stringify(dish._id)?obj.total=obj.quantity*obj.price:""):"";


this.toastr.success('', 'Successfully Added! ');
  localStorage.setItem("order",JSON.stringify(this.a))
  this.userService.sendMessage("order")

}
openDialog(feed:any) {
  const dialogRef = this.dialog.open(ViewDishComponent, {
    data: { name: feed },
    backdropClass: "bdrop"
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log(`Dialog result: ${result}`);
  });
}
filter(event:any){
  console.log(event.value);
  if(event.value=='veg')
  {
    this.dishs=this.temp.filter(res=>res.type==event.value);
 }
  else if(event.value=='non-veg')
  this.dishs=this.temp.filter(res=>res.type==event.value);
  else
  this.dishs=this.temp;
}


//chart
public doughnutChartLabels: string[] = [ 'Download Sales', 'In-Store Sales', 'Mail-Order Sales' ];
  public doughnutChartData: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels,
    datasets: [
      { data: [ 350, 450, 100 ] },
      { data: [ 50, 150, 120 ] },
      { data: [ 250, 130, 70 ] }
    ]
  };
  public doughnutChartType: ChartType = 'doughnut';

  // events
  // public chartClicked({ event, active }: { event: ChartEvent, active: {}[] }): void {
  //   console.log(event, active);
  // }

  public chartHovered({ event, active }: { event: ChartEvent, active: {}[] }): void {
    console.log(event, active);
  }


  //bar
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  public barChartOptions: ChartConfiguration['options'] = {
    elements: {
      line: {
        tension: 0.4
      }
    },
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      x: {},
      y: {
        min: 10
      }
    },
    plugins: {
      legend: { display: true },
    }
  };

  public date=new Date();
  public barChartLabels: any[] = [];
  public barChartType: ChartType = 'bar';

  public barChartData: ChartData<'bar'> = {
    labels: this.barChartLabels,
    datasets: [
      { data: [ 65, 59, 80, 81, 56, 55, 40 ], label: 'No of orders per day' }
      // { data: [ 28, 48, 40, 19, 86, 27, 90 ], label: 'Series B' }
    ]
  };

  // events
  public chartClicked({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    console.log(event, active);
  }

  // public chartHovered({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
  //   console.log(event, active);
  // }

  public randomize(): void {
    this.barChartType = this.barChartType === 'bar' ? 'line' : 'bar';
  }

///line



public lineChartData: ChartConfiguration['data'] = {
  datasets: [
    {
      data: [ 0,0,0,0,0,0,5, 7,],
      label: 'Series A',
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)',
      fill: 'origin',
    },
    {
      data: [ 0,0,0,0,0,0,8, 10,],
      label: 'Series B',
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)',
      fill: 'origin',
    },
    {
      data: [ 0,0,0,0,0,0,3, 6,],
      label: 'Series C',
      yAxisID: 'y-axis-1',
      backgroundColor: 'rgba(255,0,0,0.3)',
      borderColor: 'red',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)',
      fill: 'origin',
    }
  ],
  labels: [ 'January','February','March','April','May','June','July', 'August', 'September', 'October', 'November', 'December' ]
};

public lineChartOptions: ChartConfiguration['options'] = {
  elements: {
    line: {
      tension: 0.5
    }
  },
  scales: {
    // We use this empty structure as a placeholder for dynamic theming.
    x: {},
    'y-axis-0':
      {
        position: 'left',
      },
    'y-axis-1': {
      position: 'right',
      grid: {
        color: 'rgba(255,0,0,0.3)',
      },
      ticks: {
        color: 'red'
      }
    }
  },

  plugins: {
    legend: { display: true },
    annotation: {
      annotations: [
        {
          type: 'line',
          scaleID: 'x',
          value: 'March',
          borderColor: 'orange',
          borderWidth: 2,
          label: {
            position: 'center',
            //  enabled: true,
            color: 'orange',
            content: 'LineAnno',
            font: {
              weight: 'bold'
            }
          }
        },
      ],
    }
  }
};

public lineChartType: ChartType = 'line';

// @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

private static generateNumber(i: number): number {
  return Math.floor((Math.random() * (i < 2 ? 100 : 1000)) + 1);
}

// public randomize(): void {
//   for (let i = 0; i < this.lineChartData.datasets.length; i++) {
//     for (let j = 0; j < this.lineChartData.datasets[i].data.length; j++) {
//       this.lineChartData.datasets[i].data[j] = LineChartComponent.generateNumber(i);
//     }
//   }
//   this.chart?.update();
// }

// events
// public chartClicked({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
//   console.log(event, active);
// }

// public chartHovered({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
//   console.log(event, active);
// }

public hideOne(): void {
  const isHidden = this.chart?.isDatasetHidden(1);
  this.chart?.hideDataset(1, !isHidden);
}

public pushOne(): void {
  this.lineChartData.datasets.forEach((x, i) => {
    const num = HomeComponent.generateNumber(i);
    x.data.push(num);
  });
  this.lineChartData?.labels?.push(`Label ${ this.lineChartData.labels.length }`);

  this.chart?.update();
}

public changeColor(): void {
  this.lineChartData.datasets[2].borderColor = 'green';
  this.lineChartData.datasets[2].backgroundColor = `rgba(0, 255, 0, 0.3)`;

  this.chart?.update();
}

public changeLabel(): void {
  if (this.lineChartData.labels) {
    this.lineChartData.labels[2] = [ '1st Line', '2nd Line' ];
  }

  this.chart?.update();
}
orderStatus(data:any){

  console.log(data);
  // this.userService.sendMessageOrder(data);
  this.router.navigate(['showVenderOrders',data])

}
}
