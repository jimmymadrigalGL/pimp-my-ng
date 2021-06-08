import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RuleNode } from '../models/rule-node.model';

@Component({
  selector: 'app-node',
  templateUrl: './node.component.html',
})
export class NodeComponent{
  private urlPrefix = 'https://www.google.com/search?q=';

  @Input() node: RuleNode;
  @Output() toggle = new EventEmitter();

  get urlReference(): string {
    return `${this.urlPrefix}${this.node.reference}`;
  }

  onToggle() {
    if (!this.node.children?.length) {
      this.toggle.emit();
    }
  }
}