import {FormControl} from '@angular/forms';

// 表单验证条件：手机
export function ageFormatValidator(control: FormControl): { [s: string]: boolean } {
  const mobilePhoneReg = /^(?:[1-9][0-9]?|1[01][0-9]|120)$/;
  const yzRouter = mobilePhoneReg.test(control.value);
  if (control.value && !yzRouter) {
    console.log({age: true, error: true});
    return {age: true, error: true};
  }
  return {};
}
