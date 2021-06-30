import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-showfood',
  templateUrl: './showfood.component.html',
  styleUrls: ['./showfood.component.scss'],
})
export class ShowfoodComponent implements OnInit {
  @Output() addFood: EventEmitter<any> = new EventEmitter<any>();
  constructor(private router:Router) { }

  ngOnInit() {}
  back(){
    this.router.navigateByUrl('cartfood')
  }
}
