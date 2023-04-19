import {FormControl} from '@angular/forms';

// 表单验证条件：身份证号
export function idCardFormatValidator(control: FormControl): { [s: string]: boolean } {
  const idCardReg = /^[1-9]\d{5}(18|19|20|(3\d))\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
  // /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;

  const yzRouter = idCardReg.test(control.value);
  if (control.value && !yzRouter) {
    console.log({mobilePhone: true, error: true});
    return {mobilePhone: true, error: true};
  }
  return {};
}



