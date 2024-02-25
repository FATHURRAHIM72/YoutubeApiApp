import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  searchQuery: string = '';
  apiKey = environment.youtubeApiKey; // Using API key from environment.ts
  randomVideos: any[] = [];
  videoUrl: SafeResourceUrl | undefined;
  searchResults: any[] | undefined;

  constructor(private http: HttpClient, private sanitizer: DomSanitizer, private router: Router) { }

  searchVideos(): void {
    console.log('Search query:', this.searchQuery); // Log search query
    const apiUrl = `https://www.googleapis.com/youtube/v3/search?key=${this.apiKey}&q=${this.searchQuery}&part=snippet&type=video`;
    this.http.get(apiUrl).subscribe((response: any) => {
        console.log('Search response:', response); // Log search response
        this.router.navigate(['/searchresult'], { queryParams: { q: this.searchQuery, results: JSON.stringify(response.items) } });
    });
  }

  ngOnInit(): void {
    this.fetchRandomVideos();
  }

  fetchRandomVideos(): void {
    const maxResults = 36;
    const apiUrl = `https://www.googleapis.com/youtube/v3/search?key=${this.apiKey}&q=nat+geo-wild&part=snippet&type=video&maxResults=${maxResults}`;
    this.http.get(apiUrl).subscribe((response: any) => {
      this.randomVideos = response.items;
    });
  }

  watchVideo(videoId: string): void {
    const videoUrl = `https://www.youtube.com/embed/${videoId}`;
    this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(videoUrl);
  }

  goToVideo(videoId: string): void {
    this.router.navigate(['/video'], { queryParams: { videoId } });
  }

}
