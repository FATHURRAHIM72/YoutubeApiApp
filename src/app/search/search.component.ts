import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { YoutubeService } from '../youtube.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {

  searchQuery: string = '';

  constructor(private youtubeService: YoutubeService, private router: Router) { }

  searchVideos() {
    if (this.searchQuery.trim() !== '') {
      this.router.navigate(['/searchresult'], { queryParams: { q: this.searchQuery } });
    }
  }

}
