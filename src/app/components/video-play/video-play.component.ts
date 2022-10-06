import { ElementRef, Input, ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-video-play',
  templateUrl: './video-play.component.html',
  styleUrls: ['./video-play.component.css'],
})
export class VideoPlayComponent implements OnInit {
  @Input('urlLesson') urlLesson: string;

  constructor() {}

  ngOnInit(): void {}
}
