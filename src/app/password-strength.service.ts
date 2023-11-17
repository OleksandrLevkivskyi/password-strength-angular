import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PasswordStrengthService {
  getPasswordStrength(value: string): string | null {
    const hasLetters = /[a-zA-Z]+/.test(value);
    const hasNumbers = /\d+/.test(value);
    const hasSymbols = /[#$-/:-?{-~!"^_@`\[\]]/.test(value);

    const isSingleType =
      [hasLetters, hasNumbers, hasSymbols].filter((item) => !!item).length === 1;

    if (!value) {
      return null;
    } else if (value.length < 8 || isSingleType ) {
      return 'weak';
    } else if (hasLetters && hasNumbers && hasSymbols) {
      return 'strong';
    } else {
      return 'medium';
    }
  }
  
}
