import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { ClassesService } from 'src/app/services/classes.service';
import { UserService } from 'src/app/services/user.service';
import { Classes, Tasks, User } from 'src/interface';

@Component({
  selector: 'app-class',
  templateUrl: './class.component.html',
  styleUrls: ['./class.component.css'],
})
export class ClassComponent implements OnInit {
  loader: boolean = true;
  userLogin!: User;
  index!: number;
  class!: Classes;
  tasks!: Tasks[];
  progress: boolean = false;
  state: string = 'start';
  toast: boolean = false;
  hours!: Number;
  minutes!: Number;
  showPopUp: boolean = false;
  scroll!: Number;

  constructor(
    private route: ActivatedRoute,
    private classesService: ClassesService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((param) => {
      this.classesService.getClass(param['id']).subscribe((data) => {
        this.class = data;
        this.tasks = data.tasks;
        this.loader = false;
        this.nextTask();
      });
    });
    new BehaviorSubject(localStorage.getItem('userLogin') ?? '{}').subscribe(
      (data) => {
        this.userLogin = JSON.parse(data);
      }
    );
  }

  nextTask() {
    this.userLogin.classes.forEach((cls) => {
      if (cls.class == this.class.part) {
        for (let i = 0; i < +cls.day - 1; i++) {
          this.tasks[i].done = true;
        }
      }
    });
  }

  start(part: string) {
    if (!this.userLogin.email) {
      const scrollY = window.pageYOffset || document.documentElement.scrollTop;
      this.scroll = scrollY;

      this.showPopUp = true;
      setTimeout(() => {
        this.showPopUp = false;
      }, 5000);
      return;
    }

    if (this.state == 'done') {
      this.onDoneTask(part);
      this.state = 'start';
      this.progress = false;
    } else {
      const cls = this.userLogin.classes.filter((cls) => cls.class == part)[0];
      const date = Math.floor(new Date().getTime());

      if (+date < +cls.lastDoneDate + 86400000 && !(cls.day == 1)) {
        this.hours = Math.floor(24 - (+date - +cls.lastDoneDate) / 1000 / 3600);
        this.minutes = Math.floor(60 - (+date - +cls.lastDoneDate) / 1000 / 60);

        this.toast = true;
        setTimeout(() => {
          this.toast = false;
        }, 2000);
      } else {
        this.state = 'done';
        this.progress = true;
      }
    }
  }

  onDoneTask(part: string) {
    this.userLogin.classes.forEach((cls) => {
      if (cls.class == part) {
        cls.day = +cls.day + 1;
        cls.lastDoneDate = +new Date();
        this.nextTask();
      }
    });
    this.userService
      .doneTask({ userId: this.userLogin._id, class: part })
      .subscribe((data: any) => {
        localStorage.setItem('userLogin', JSON.stringify(data));
      });
  }
}
