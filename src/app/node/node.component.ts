import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RuleNode } from '../models/rule-node.model';

@Component({
  selector: 'app-node',
  templateUrl: './node.component.html'
})
export class NodeComponent {
  @Input() node: RuleNode;
  @Output() toggle = new EventEmitter();

  private urlPrefix = 'https://www.google.com/search?q=';

  get urlReference(): string {
    return `${this.urlPrefix}${this.node.reference}`;
  }

  get isRule(){
    return this.node.type === 'Rule';
  }

  onToggle() {
    if (!this.node.children || this.node.children.length === 0) {
      this.toggle.emit();
    }
  }
}
