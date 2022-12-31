import { AbstractControl, FormGroup, ValidationErrors } from '@angular/forms';

export function ConfirmNewIsNotOld(controlName: string, matchingControlName: string){
    return (controls: AbstractControl) => {
        const control: any = controls.get(controlName);
        const matchingControl: any = controls.get(matchingControlName);
        if (matchingControl.errors && !matchingControl.errors.confirmNewIsNotOld) {
            return;
        }
        if (control.value === matchingControl.value) {
            return matchingControl.setErrors({ confirmNewIsNotOld: true });
        } else {
            return matchingControl.setErrors(null);
        }
    }
}
    
export function ConfirmedValidator(controlName: string, matchingControlName: string){
    return (controls: AbstractControl) => {
        const control: any = controls.get(controlName);
        const matchingControl: any = controls.get(matchingControlName);
        if (matchingControl.errors && !matchingControl.errors.confirmedValidator) {
            return;
        }
        if (control.value !== matchingControl.value) {
            return matchingControl.setErrors({ confirmedValidator: true });
        } else {
            return matchingControl.setErrors(null);
        }
    }
}

export function CompareValidator(controlName: string, matchingControlName: string, type:string = 'lessthan'){
    return (controls: AbstractControl) => {
        const control: any = controls.get(controlName);
        const matchingControl: any = controls.get(matchingControlName);
        if (matchingControl.errors && !matchingControl.errors.compareFloatValidator) {
            return;
        }
        let value1: number = parseFloat(control.value);
        let value2: number = parseFloat(matchingControl.value);
        
        if (value1 >= value2 && type === 'lessthan') {
            return matchingControl.setErrors({ compareValidator: true });
        }else if (value1 <= value2 && type === 'greaterthan') {
            return matchingControl.setErrors({ compareValidator: true });
        } else {
            return matchingControl.setErrors(null);
        }
    }
}

