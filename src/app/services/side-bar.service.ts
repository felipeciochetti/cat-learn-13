import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SideBarService {



  nav = [
    {label: "Home", slug: "/", icon: "fas fa-home ico s20"},
    {label: "My Courses", slug: "my-courses", icon: "fas fa-briefcase ico s20 "},
    {label: "Categories", slug: "cates", icon: "fas fa-tag ico s20 "}
  ];


  constructor() { }
}
