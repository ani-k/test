import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'pis-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.less']
})
export class FooterComponent implements OnInit {

  menu1Items: any = [
    {name: 'Menu Item 1', link: '#'},
    {name: 'Menu Item 2', link: '#'},
    {name: 'Menu Item 3', link: '#'},
    {name: 'Menu Item 4', link: '#'},
  ];
  menu2Items: any = [
    {name: 'Menu Item 1', link: '#'},
    {name: 'Menu Item 2', link: '#'},
  ];
  contactsMenuItems: any = [
    {name: 'Phone: ', value: '8(800)555-35-35'},
    {name: 'Email: ', value: 'net@emaila.com'},
  ];

  constructor() { }

  ngOnInit() {
  }

}
