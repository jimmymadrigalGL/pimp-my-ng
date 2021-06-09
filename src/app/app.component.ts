import { Component } from '@angular/core';
import { RuleNode } from './models/rule-node.model';
import { ApiService } from './services/api.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html'
})
export class AppComponent {
  treeList$ = this.api.treeList$;

  constructor(private api: ApiService) {
  }

  onToggle(node: RuleNode) {
    this.api.checkNode(node.index, !node.checked);
  }

  identify(index, node: RuleNode): number {
    return node.index;
  }
}
