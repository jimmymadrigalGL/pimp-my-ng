import { Injectable } from '@angular/core';
import { Observable, from, BehaviorSubject, combineLatest } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { RuleNode } from '../models/rule-node.model';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private treeListSubject$ = new BehaviorSubject<RuleNode[]>([]);
  private checkedSubject$ = new BehaviorSubject<{ [key: string]: true }>({});

  treeList$: Observable<RuleNode[]> = combineLatest([
    this.treeListSubject$,
    this.checkedSubject$
  ]).pipe(
    tap(([list, checked]) =>
      list.forEach(node => this.markTree(node, checked))
    ),
    map(([list, checked]) => list)
  );

  constructor() {}

  fetchTree() {
    this.fetchTreeApi().subscribe(list => this.treeListSubject$.next(list));
  }

  checkNode(id: string | number, check = true) {
    const checked = { ...this.checkedSubject$.value };
    if (check) {
      checked[id] = true;
    } else {
      delete checked[id];
    }
    this.checkedSubject$.next(checked);
  }

  private markTree(node: RuleNode, checked: { [key: string]: true }) {
    node.children.map(child => this.markTree(child, checked));
    node.checked =
      checked[node.index] ||
      (node.children.length > 0 && node.children.every(child => child.checked));
  }

  private fetchTreeApi(): Observable<RuleNode[]> {
    const serverUrl = 'https://api.jsonbin.io';
    const contentId = '60c129c64d024768b8f5199a';
    const url = `${serverUrl}/b/${contentId}`;
    return from(fetch(url).then(res => res.json()));
  }
}
