import {FormControl} from '@angular/forms';

// 表单验证条件：router必须以 / 斜线开头
export function routerFormatValidator(control: FormControl): { [s: string]: boolean } {
  const routerReg = /^\//;
  const yzRouter = routerReg.test(control.value);
  if (!control.value) {
    return {required: true};
  } else if (!yzRouter) {
    return {route: true, error: true};
  }
  return {};
}
