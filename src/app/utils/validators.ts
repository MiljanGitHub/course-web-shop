import { AbstractControl, ValidationErrors } from "@angular/forms";

export class Validator {
    
    static cannotContainWhitespaceOnly(control: AbstractControl) : ValidationErrors | null {
        var string = (control.value as string);
        if(string === null || string.match(/^ *$/) !== null){
            return {cannotContainWhitespaceOnly: true}
        }
        return null;
    }

    static isUncategorized(control: AbstractControl) : ValidationErrors | null {
        if (control.value === null || control.value === undefined || control.value === "Select category" || control.value.match(/^ *$/) !== null) return {isUncategorized: true}
        return null;
    }
}