import {FormControl} from '@angular/forms';

// 表单验证条件：ip
export function ipFormatValidator (control: FormControl): { [s: string]: boolean } {
  const reg = /^(25[0-5]|2[0-4]\d|[0-1]?\d?\d)(\.(25[0-5]|2[0-4]\d|[0-1]?\d?\d)){3}$/;
  const yzTest = reg.test(control.value);
  if (!control.value) {
    return {required: true};
  } else if (!yzTest) {
    return {ipValidator: true, error: true};
  }
  return {};
};
