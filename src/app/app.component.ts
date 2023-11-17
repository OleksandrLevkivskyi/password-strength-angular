import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  ReactiveFormsModule,
  FormControl,
  Validators
} from '@angular/forms';

import { PasswordStrengthComponent } from "./password-strength/password-strength.component";
import { PasswordInputComponent } from "./password-input/password-input.component";
import { PasswordStrengthService } from './password-strength.service';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    imports: [CommonModule, ReactiveFormsModule, PasswordStrengthComponent, PasswordInputComponent]
})
export class AppComponent {
  passwordForm = this.formBuilder.group({
    password: [{value: ''}, [Validators.required, this.passwordStrengthValidator()]],
  });
  passwordFormControl: FormControl = new FormControl('', {nonNullable: true})

  constructor(public formBuilder: FormBuilder, private passwordStrengthService:PasswordStrengthService) {}

  passwordStrengthValidator() {
    return (control: FormControl) => {
      const value = control.value;
      return {strength: this.passwordStrengthService.getPasswordStrength(value)}
    };
  }
}
