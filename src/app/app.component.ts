import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ApiService } from './services/api.service';
import { RuleNode } from './models/rule-node';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit, OnDestroy {
  tree: RuleNode[];
  private subscriptions = new Subscription();

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.loadRules();
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  loadRules() {
    this.subscriptions.add(
      this.api.fetchRules().subscribe(tree => (this.tree = tree))
    );
  }
}
