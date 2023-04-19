import {FormControl} from '@angular/forms';

// 表单验证条件：固定电话
export function phoneFormatValidator(control: FormControl): { [s: string]: boolean } {
  const phoneReg = /\d{3}-\d{8}|\d{4}-\d{7}/;
  const yzRouter = phoneReg.test(control.value);
  if (!control.value) {
    return {required: true};
  } else if (!yzRouter) {
    return {phone: true, error: true};
  }
  return {};
}
