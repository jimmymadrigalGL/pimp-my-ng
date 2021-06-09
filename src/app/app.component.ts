import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { RuleNode } from './models/rule-node.model';
import { ApiService } from './services/api.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit, OnDestroy {
  treeList$ = this.api.treeList$;
  subscriptions: Subscription = new Subscription();

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.api.fetchTree();
  }

  ngOnDestroy(): void {}

  onToggle(node: RuleNode) {
    this.api.checkNode(node.index, !node.checked);
  }

  identify(index, node: RuleNode): number {
    return node.index;
  }
}
