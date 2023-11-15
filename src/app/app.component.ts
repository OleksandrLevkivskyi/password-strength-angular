import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  ReactiveFormsModule,
  FormControl,
  ValidationErrors,
  Validators
} from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  passwordForm = this.formBuilder.group({
    password: ['', [Validators.required, this.passwordStrengthValidator()]],
  });

  get passwordErrors(): ValidationErrors {
    return this.passwordForm.controls.password?.errors ?? {};
  }

  get passwordLength(): number {
    return this.passwordForm.controls.password.value !== null
      ? this.passwordForm.controls.password.value.length
      : 0;
  }
  constructor(public formBuilder: FormBuilder) {}

  isErrorExist(errorType: string) {
    return (
      Object.keys(this.passwordErrors).includes('strength') &&
      this.passwordErrors['strength'] === errorType
    );
  }

  passwordStrengthValidator() {
    return (control: FormControl) => {
      const value = control.value;
      if (!value) {
        return null;
      }

      const hasLetters = /[a-zA-Z]+/.test(value);
      const hasNumbers = /\d+/.test(value);
      const hasSymbols = /[#$-/:-?{-~!"^_@`\[\]]/.test(value);

      const isSingleType =
        [hasLetters, hasNumbers, hasSymbols].filter((item) => !!item).length === 1;

      if (value.length < 8 || isSingleType) {
        return { strength: 'weak' };
      } else if (hasLetters && hasNumbers && hasSymbols) {
        return { strength: 'strong' };
      } else {
        return { strength: 'medium' };
      }
    };
  }
}
