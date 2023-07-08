import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.css'],
})
export class PopUpComponent implements OnInit {
  @Input() scroll!: Number;

  ngOnInit(): void {
    this.scroll = +this.scroll - 80;
  }
}
