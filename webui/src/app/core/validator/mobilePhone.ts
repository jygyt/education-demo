import {FormControl} from '@angular/forms';

// 表单验证条件：手机
export function mobilePhoneFormatValidator(control: FormControl): { [s: string]: boolean } {
  const mobilePhoneReg = /^1[3|4|5|6|7|8|9][0-9]{9}$/;
  const yzRouter = mobilePhoneReg.test(control.value);
  if (control.value && !yzRouter) {
    console.log({mobilePhone: true, error: true});
    return {mobilePhone: true, error: true};
  }
  return {};
}
