import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  @Output() close = new EventEmitter();
  @Input() login: boolean | undefined;

  myForm!: FormGroup;
  isNotValid: boolean = false;
  reqMessage: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.myForm = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onClose() {
    this.close.emit();
  }

  toggleLogin() {
    this.login = !this.login;
    this.isNotValid = false;
  }

  onSubmit() {
    if (!this.login) {
      this.myForm.value.firstname = 'user';
      this.myForm.value.lastname = 'user';

      if (!this.myForm.value.email || !this.myForm.value.password) {
        this.reqMessage = true;
        setTimeout(() => {
          this.reqMessage = false;
        }, 2000);
        return;
      }

      const user = {
        cart: [],
        ...this.myForm.value,
      };

      this.userService.onLogin(user).subscribe((user: any) => {
        this.close.emit(user);
      });
    } else {
      if (this.myForm.invalid) {
        this.reqMessage = true;
        setTimeout(() => {
          this.reqMessage = false;
        }, 2000);
        return;
      }
      if (this.login) {
        const newUser = {
          cart: [],
          ...this.myForm.value,
        };
        this.userService.onRegister(newUser).subscribe((user) => {
          this.close.emit(user);
        });
      }
    }
  }
}
