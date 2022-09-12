import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private Router: Router) {}
  title = 'AmSocalFeed';
  router: any;
  ngOnInit(): void {
    this.router = this.Router;
    //console.log(this.router.url);
  }
}
