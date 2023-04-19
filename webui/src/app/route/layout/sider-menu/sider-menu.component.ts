
import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-sider-menu',
  templateUrl: './sider-menu.component.html',
  styleUrls: ['./sider-menu.component.less']
})
export class SiderMenuComponent implements OnInit, OnChanges {
  @Input() menus = [];

  @Input() isCollapsed = false;

  // 当前展开的菜单id集合
  openItem = [];

  constructor() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.isCollapsed) {
      this.isCollapsed = changes.isCollapsed.currentValue;
      if (!this.isCollapsed) { // 展开
        this.setOpenItem(this.menus);
      } else { // 收缩
        this.openItem = [];
        this.selectedOpenItem(this.menus);
        this.closeMenu(this.menus);
      }
    }

  }

  ngOnInit() {
  }

  // 同级菜单只能展开一项
  OpenChange(menu) {
    this.closeMenu(this.menus);
    menu.open = !menu.open;
  }

  // 关闭其他菜单栏
  closeMenu(menus) {
    if (menus && menus.length > 0) {
      menus.forEach((item) => {
        item.open = false;
        item.selected = false;
        this.closeMenu(item.childList);
      });
    }
  }

  // 筛选出当前展开状态的菜单
  selectedOpenItem(menus) {
    if (menus && menus.length > 0) {
      menus.forEach((item) => {
        if (item.open) {
          this.openItem.push(item.id);
        }
        this.selectedOpenItem(item.childList);
      });
    }
  }

  // 恢复展开的菜单
  setOpenItem(menus) {
    if (menus && menus.length > 0) {
      menus.forEach((item) => {
        this.openItem.forEach((id) => {
          if (id === item.id) {
            item.open = true;
          }
        });
        this.setOpenItem(item.childList);
      });
    }
  }

  // 选择一项菜单
  selectedMenu(menu) {
    // console.table(this.menus);
    this.cancelSelected(this.menus);
    menu.selected = true;
  }

  // 取消其他菜单选中
  cancelSelected(menus) {
    if (menus && menus.length > 0) {
      menus.forEach((item) => {
        item.selected = false;
        this.cancelSelected(item.childList);
      });
    }
  }
}
