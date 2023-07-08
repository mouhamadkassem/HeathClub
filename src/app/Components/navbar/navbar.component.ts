import { Component, OnInit } from '@angular/core';
import { Input, Output, EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { faNavicon } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  @Input() color: string | undefined;
  @Output() toggle = new EventEmitter();

  home: string = 'Home';
  shop: string = 'Shop';
  cart: string = 'Cart';
  classes: string = 'Classes';
  contact: string = 'contact Us';
  sign: string = 'Login';
  isLogin: boolean = false;
  hideAll: boolean = false;
  showSubnav: boolean = false;
  icon = faNavicon;

  brandImg: string =
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcqA7O4zUSweXfXMUtn0rO4WFnJLSIwaeadQ&usqp=CAU';

  black = 'black';

  ngOnInit(): void {
    const url = document.URL;
    const urlLength = url.length;

    if (url[urlLength - 1] == '/') {
      this.ontoggle('Home');
    } else this.ontoggle('notHome');

    new BehaviorSubject(localStorage.getItem('userLogin') ?? '{}').subscribe(
      (data: any) => {
        const user = JSON.parse(data);

        if (user?.email) {
          this.isLogin = true;
          this.hideAll = true;
        }
      }
    );
  }

  ontoggle(page: string) {
    this.toggle.emit(page);
  }

  showForm(user: any) {
    this.showSubnav = false;
    if (user?.email) {
      localStorage.setItem('userLogin', JSON.stringify(user));
      this.isLogin = true;
      this.hideAll = true;
    } else this.isLogin = !this.isLogin;
  }

  toggleShowSubnav() {
    this.showSubnav = !this.showSubnav;
  }

  logOut() {
    localStorage.clear();
    this.isLogin = false;
    this.hideAll = false;
    this.showSubnav = false;
  }
}
