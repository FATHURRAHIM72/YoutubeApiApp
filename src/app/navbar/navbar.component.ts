import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { YoutubeService } from '../youtube.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  searchQuery: string = '';

  constructor(private youtubeService: YoutubeService, private router: Router) { }

  searchVideos() {
    if (this.searchQuery.trim() !== '') {
      this.router.navigate(['/searchresult'], { queryParams: { q: this.searchQuery } });
    }
  }

}
