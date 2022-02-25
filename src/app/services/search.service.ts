import { UrlsService } from 'src/app/services/urls.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  constructor(private urlsService: UrlsService) {}


}
