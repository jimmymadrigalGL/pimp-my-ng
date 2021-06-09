import { Component, DoCheck, EventEmitter, Input, Output } from '@angular/core';
import { RuleNode } from '../models/rule-node.model';

@Component({
  selector: 'app-node',
  templateUrl: './node.component.html'
})
export class NodeComponent implements DoCheck {
  @Input() node: RuleNode;
  @Output() toggle = new EventEmitter();

  private urlPrefix = 'https://www.google.com/search?q=';

  checkCount = 0;

  constructor() {
    setInterval(null, 1000);
  }

  ngDoCheck(): void {
    this.checkCount++;
  }

  get urlReference(): string {
    return `${this.urlPrefix}${this.node.reference}`;
  }

  get isRule() {
    return this.node.type === 'Rule';
  }

  onToggle() {
    if (!this.node.children || this.node.children.length === 0) {
      this.toggle.emit();
    }
  }
}
