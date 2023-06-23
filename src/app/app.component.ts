import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'HealthClub';
  isHomePage: boolean = true;
  activePage!: String;

  togglePage(page: string) {
    if (page == 'Home') {
      this.isHomePage = true;
    } else this.isHomePage = false;
  }
}
