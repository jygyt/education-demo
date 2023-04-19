
import {FormControl} from '@angular/forms';

// 表单验证条件：人数
export function peopleNumFormatValidator(control: FormControl): { [s: string]: boolean } {
  const mobilePhoneReg = /^[0-9]*$/;
  const yzRouter = mobilePhoneReg.test(control.value);
  if (!control.value) {
    return {required: true};
  } else if (!yzRouter) {
    return {mobilePhone: true, error: true};
  }
  return {};
}
