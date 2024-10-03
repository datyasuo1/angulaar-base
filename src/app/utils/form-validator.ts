import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class CustomFormValidator {
    private vietnamesePattern: RegExp;

    constructor() {
        // Regular expression pattern to match any Vietnamese characters
        this.vietnamesePattern =
            /[\u00C0-\u1EF9\u1EFB-\u1F00\u1F01-\u1F6F\u1F70-\u1FF3\u1FF4-\u1FFD]/;
    }

    // Method to validate vietnamese phone number
    public isPhoneNumberValid(phoneNumber: string): boolean {
        const regex = /^0\d{2}\d{7,8}$/;
        return regex.test(phoneNumber);
    }

    public isPasswordValid(password: string) {
        const regex =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[~!@#$%^&*()_+])[A-Za-z\d~!@#$%^&*()_+]{8,20}$/;
        return regex.test(password);
    }

    // Method to validate two strings are equal or not
    public areTwoStringEqual(v1: string, v2: string): boolean {
        return v1 === v2;
    }

    // Method to validate min string length > 0
    public isStringInputValid(inputString: string): boolean {
        return inputString && inputString.trim().length > 0;
    }

    public isObjectInputValid(inputObject: unknown): boolean {
        return inputObject && Object.keys(inputObject).length > 0;
    }

    public isRangeDateInputValid(inputDate: Date[]): boolean {
        return inputDate && inputDate?.length === 2;
    }

    // Method to validate string length > minLength
    public isMinLengthValid(inputString: string, minLength: number): boolean {
        return inputString.length >= minLength;
    }

    public containsSpace(inputString: string): boolean {
        return inputString.includes(' ');
    }

    // Method to validate string doesn't contain Vietnamese characters
    public isVietnameseValid(inputString: string): boolean {
        return !this.vietnamesePattern.test(inputString);
    }

    // Method to validate email format
    public isEmailValid(email: string): boolean {
        const emailPattern: RegExp = /^\S+@\S+\.\S+$/;
        return emailPattern.test(email);
    }

    static required(message: string): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            if (!control.value) {
                return { required: { message: message } };
            }
            return null;
        };
    }

    static maxLength(length: number = 255): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            if (control.value.length > length) {
                return {
                    maxLength: { message: `Độ dài tối đa ${length} kí tự` },
                };
            }
            return null;
        };
    }

    static valueRange(
        min: number = 1,
        max: number,
        message: string,
    ): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            const value = control.value;
            if (value && (value < min || value > max)) {
                return {
                    valueRange: { message: message },
                };
            }
            return null;
        };
    }

    static regex(regex: RegExp, message: string): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            const isValid = regex.test(control.value);

            return isValid ? null : { pattern: { message: message } };
        };
    }
}
