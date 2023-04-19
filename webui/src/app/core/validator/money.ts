import {FormControl} from '@angular/forms';

// 表单验证条件：金钱
export function moneyFormatValidator(control: FormControl): { [s: string]: boolean } {
  const mobilePhoneReg = /^[1-9][0-9]*$/;
  const yzRouter = mobilePhoneReg.test(control.value);
  if (!control.value) {
    return {required: true};
  } else if (!yzRouter) {
    return {mobilePhone: true, error: true};
  }
  return {};
}
