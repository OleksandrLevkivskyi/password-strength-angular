import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PasswordStrengthService } from '../password-strength.service';

@Component({
  selector: 'app-password-strength',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './password-strength.component.html',
  styleUrl: './password-strength.component.css'
})
export class PasswordStrengthComponent {
  @Input() password='';

  constructor(private passwordStrengthService:PasswordStrengthService) {}  

  get passwordLength(): number {
    return this.password.length;
  }

  isErrorExist(errorType: string) {
    return (
      this.passwordStrengthService.getPasswordStrength(this.password) === errorType
    );
  }
}
