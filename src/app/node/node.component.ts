import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RuleNode } from '../models/rule-node';

@Component({
  selector: 'app-node',
  templateUrl: './node.component.html'
})
export class NodeComponent{
  private urlPrefix = 'https://www.google.com/search?q=';

  @Input() node: RuleNode;
  @Output() toggle = new EventEmitter<RuleNode>();

  get urlReference(): string {
    return `${this.urlPrefix}${this.node.reference}`;
  }

  emitChecked() {
    if (!!this.node.children?.length) {
      this.toggle.emit(this.node);
    }
  }
}