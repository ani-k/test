import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'pis-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less'],
})

export class HeaderComponent implements OnInit {

  menuItems: any = [
    {name: 'Menu Item 1', link: '#'},
    {name: 'Menu Item 2', link: '#'},
    {name: 'Menu Item 3', link: '#'},
    {name: 'Menu Item 4', link: '#'},
    {name: 'Menu Item 5', link: '#'},
  ];

  constructor() {
  }

  ngOnInit() {
  }

}
