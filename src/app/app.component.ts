import { Component, OnInit } from '@angular/core';
import { RuleNode } from './models/rule-node.model';
import { FacadeService } from './services/facade.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  treeList$ = this.facade.tree$;

  constructor(private facade: FacadeService) {}

  ngOnInit() {
    this.facade.fetchTree();
  }

  onToggle(node: RuleNode) {
    this.facade.checkNode(node.index, !node.checked);
  }
}
