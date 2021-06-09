import { Injectable } from '@angular/core';
import { Observable, from, BehaviorSubject, combineLatest, ReplaySubject } from 'rxjs';
import { map, mergeMap, tap } from 'rxjs/operators';
import { RuleNode } from '../models/rule-node.model';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private action$ = new ReplaySubject<any>();
  private treeListSubject$ = new BehaviorSubject<RuleNode[]>([]);
  private checkedSubject$ = new BehaviorSubject<{ [key: string]: true }>({});

  reducer$: Observable<RuleNode[]>;
  treeList$: Observable<RuleNode[]>;

  constructor() {
    this.reducer$ = this.action$.pipe(
      mergeMap(_ => this.fetchTreeApi().pipe(
        tap(list => this.treeListSubject$.next(list)),
      ))
    );

    this.treeList$ = combineLatest([
      this.reducer$,
      this.checkedSubject$
    ]).pipe(
      tap(([list, checked]) =>
        list.forEach(node => this.markTree(node, checked))
      ),
      map(([list, checked]) => list)
    );

  }

  fetchTree() {
    this.action$.next(true);
    // return this.fetchTreeApi().pipe(
    //   tap(list => this.treeListSubject$.next(list))
    // );
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
    const serverUrl = 'https://raw.githubusercontent.com/jimmymadrigalGL';
    const contentId = 'tree.json';
    const url = `${serverUrl}/pimp-my-ng/master/src/${contentId}`;
    return from(fetch(url).then(res => res.json()));
  }
}
