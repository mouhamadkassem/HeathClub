import { Component, OnInit } from '@angular/core';
import { ClassesService } from 'src/app/services/classes.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.css'],
})
export class ClassesComponent implements OnInit {
  loader: boolean = true;
  classes: any = [];

  constructor(private classesService: ClassesService, private route: Router) {}

  ngOnInit(): void {
    this.classesService.getClasses().subscribe((data) => {
      this.classes = data;
      this.loader = false;
    });
  }

  ClassSelected(id: number) {
    this.route.navigate([`/class/${id}`]);
  }
}
