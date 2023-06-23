import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  backgroundImg: string =
    'https://i.pinimg.com/originals/cf/90/7d/cf907d75792e6207763c2e4f04529392.jpg';

  title: string = 'LOVE YOUR HEALTH';
  proverb: string = 'IS MORE THAN POSTS';

}
