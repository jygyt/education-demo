## 自定义quill组件封装

当前版本angular8.5

只用该组件前请安装ngx-quill, quill

`npm install ngx-quill@5.2.0`

`npm install quill`

组件使用方法
<quillEditor [(model)]="control.name"></quillEditor>

app.ts

```tsx
import { QuillModule } from 'ngx-quill';
@NgModule({
  declarations: [],
  imports:[
  	QuillModule.forRoot()
  ]
  })
```

index.html引入

```html
<link href="https://cdn.bootcss.com/quill/2.0.0-dev.3/quill.snow.css" rel="stylesheet">
```

quill-editor.component.ts

```tsx
import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AllService} from "../../core/service/all.service";

@Component({
  selector: 'quillEditor',
  templateUrl: './quill-editor.component.html',
  styleUrls: ['./quill-editor.component.less']
})

export class QuillEditorComponent implements OnInit {
  constructor(private allService: AllService) { }

  public editor
  //---------------- 声明一个双向绑定的model   start
  modelValue: any;

  @Output()
  modelChange = new EventEmitter<any>();

  @Input()
  get model() {
    return this.modelValue;
  }

  set model(val) {
    this.modelValue = val;
    this.modelChange.emit(this.modelValue);
  }

  //---------------- 声明一个双向绑定的model   end

  EditorCreated(quill) {
    const toolbar = quill.getModule('toolbar');
    toolbar.addHandler('image', this.imageHandler.bind(this));
    this.editor = quill;
  }

  imageHandler() {
    const Imageinput = document.createElement('input');
    Imageinput.setAttribute('type', 'file');
    Imageinput.setAttribute('accept','image/png, image/gif, image/jpeg, image/bmp, image/x-icon');
    Imageinput.classList.add('ql-image');
    Imageinput.addEventListener('change', () => {
      const file = Imageinput.files[0];
      if (Imageinput.files != null && Imageinput.files[0] != null) {
        // 上传到制定位置
        this.allService.uploadFile(file).subscribe(value => {
          const range = this.editor.getSelection(true);
          const index = range.index + range.length;
          console.log(range);
          console.log(index);
          // 富文本图片展示路径
          this.editor.insertEmbed(range.index, 'image', '/backstage/filecenter/file/'+value.data.id);
        })
      }
    });
    Imageinput.click();
  }

  ngOnInit() {
  }

}
```
