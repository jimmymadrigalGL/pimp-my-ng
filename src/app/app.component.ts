import { Component } from '@angular/core';
import { RuleNode } from './models/rule-node.model';
import { FacadeService } from './services/facade.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html'
})
export class AppComponent {
  treeList$ = this.facade.tree$;

  constructor(private facade: FacadeService) {}

  onToggle(node: RuleNode) {
    this.facade.checkNode(node.index, !node.checked);
  }

  identify(index, node: RuleNode): number {
    return node.index;
  }
}
