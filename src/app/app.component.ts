import { Component, OnInit } from '@angular/core';
import { RuleNode } from './models/rule-node.model';
import { ApiService } from './services/api.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  treeList$ = this.api.treeList$;

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.api.fetchTree();
  }

  onToggle(node: RuleNode) {
    this.api.checkNode(node.index, !node.checked);
  }
}
