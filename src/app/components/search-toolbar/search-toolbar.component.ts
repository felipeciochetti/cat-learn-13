import { SearchService } from './../../services/search.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CourseService } from 'src/app/services/course.service';
import { NavigationService } from 'src/app/services/navigation.service';

@Component({
  selector: 'app-search-toolbar',
  templateUrl: './search-toolbar.component.html',
  styleUrls: ['./search-toolbar.component.css']
})
export class SearchToolbarComponent implements OnInit {
  constructor(private router: Router, private navigationService: NavigationService) {}

  ngOnInit() {}

  doSearch(value: string) {

    this.navigationService.navigateToSearchCourse(value);
    
  }
}
