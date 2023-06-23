import { Component } from '@angular/core';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent {
  formData: any = {};
  popUp: boolean = false;
  reqMessage: boolean = false;

  constructor(private messageService: MessageService) {}

  onSubmit() {
    if (!this.formData.message || !this.formData.email) {
      this.reqMessage = true;
      setTimeout(() => {
        this.reqMessage = false;
      }, 3000);
      return;
    }
    this.messageService.sendMessage(this.formData).subscribe((data: any) => {
      this.popUp = true;
      setTimeout(() => {
        this.popUp = false;
      }, 60000);
    });
  }
}
