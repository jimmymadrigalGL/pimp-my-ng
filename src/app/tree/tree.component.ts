import { Component, Input, OnInit } from '@angular/core';
import { RuleNode } from '../models/rule-node';

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html'
})
export class TreeComponent {
  @Input() node: RuleNode;

  constructor() { }

  validateChecked(){
    this.validateNodeChecked({ children: this.node.children });
  }

  private validateNodeChecked(node: Partial<RuleNode>) {
    if (!node?.children.length) {
      return;
    }
    node.children.forEach(child => this.validateNodeChecked(child));
    node.checked = node.children.every(node => node.checked);
  }

}