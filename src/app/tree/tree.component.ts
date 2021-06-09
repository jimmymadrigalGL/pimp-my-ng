import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RuleNode } from '../models/rule-node.model';

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html'
})
export class TreeComponent {
  @Input() node: RuleNode;
  @Output() toggle = new EventEmitter<RuleNode>();

  onToggle(node: RuleNode) {
    this.toggle.emit(node);
  }
}
