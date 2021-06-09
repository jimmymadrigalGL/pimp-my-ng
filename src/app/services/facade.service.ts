import { Injectable } from '@angular/core';
import { ReplaySubject, Observable, of, from } from 'rxjs';
import { map, scan, switchMap, tap } from 'rxjs/operators';
import { RuleNode } from '../models/rule-node.model';

interface VirtualNode {
  id: string;
  children: VirtualNode[];
}

interface CheckAction {
  type: 'Check';
  id: string;
}

interface UncheckAction {
  type: 'Uncheck';
  id: string;
}

interface LoadAction {
  type: 'Load';
}

interface LoadSuccessAction {
  type: 'Load Success';
  hash: { [key: string]: RuleNode };
  tree: VirtualNode[];
}

type Action = CheckAction | UncheckAction | LoadAction | LoadSuccessAction;

interface State {
  hash: { [key: string]: RuleNode };
  tree: VirtualNode[];
  checked: { [key: string]: true };
}

@Injectable({ providedIn: 'root' })
export class FacadeService {
  private initialState: State = {
    hash: {},
    tree: [],
    checked: {}
  };
  private state$: Observable<State>;
  private actions$ = new ReplaySubject<Action>();

  tree$: Observable<RuleNode[]>;

  constructor() {
    this.createState();
  }

  fetchTree() {
    this.actions$.next({
      type: 'Load'
    });
  }

  checkNode(id: string | number, check = true) {
    this.actions$.next({
      type: check ? 'Check' : 'Uncheck',
      id: id.toString()
    });
  }

  private createState() {
    this.state$ = this.actions$.pipe(
      switchMap(action => this.handleEffect(action)),
      tap(action => console.log(action)),
      scan((state, action) => this.reduce(action, state), this.initialState),
      tap(state => console.log(state)),
    );
    this.tree$ = this.state$.pipe(
      map(state => this.unpackTree(state)),
      tap(tree => console.log(tree)),
    );
  }

  private handleEffect(action: Action): Observable<Action> {
    if (action.type === 'Load') {
      return this.fetchTreeApi().pipe(map(list => this.handleLoadAction(list)));
    }
    return of(action);
  }

  private handleLoadAction(list: RuleNode[]): LoadSuccessAction {
    return {
      type: 'Load Success',
      hash: this.createHash(list),
      tree: this.packTree(list),
    };
  }

  private reduce(action: Action, state: State): State {
    switch (action.type) {
      case 'Check':
        return {
          ...state,
          checked: {
            ...state.checked,
            [action.id]: true
          }
        };
      case 'Uncheck':
        const checked = { ...state.checked };
        delete checked[action.id];
        return {
          ...state,
          checked: {
            ...checked
          }
        };
      case 'Load Success':
        return {
          ...state,
          hash: action.hash,
          tree: action.tree
        };
    }
  }

  private packTree(list: RuleNode[]): VirtualNode[] {
    const fn = (node: RuleNode, children: VirtualNode[]) => ({ id: node.index.toString(), children });
    return list.map(node => this.executePostOrder(node, fn))
  }

  private createHash(list: RuleNode[]): { [key: string]: RuleNode } {
    const reduce = list => list.reduce((acum, hash) => ({ ...hash, ...acum }), {});

    const fn = (node: RuleNode, children: { [key: string]: RuleNode }[]) => ({ [node.index]: node, ...reduce(children) });
    const hash = reduce(list.map(node => this.executePostOrder(node, fn)));
    return hash;
  }

  private unpackTree(state: State): RuleNode[] {
    const checked = (id: string, children: RuleNode[]) => state.checked[id]
      || (children.length > 0 && children.every(child => state.checked[child.index]));

    const fn = (virtualNode: VirtualNode, children: RuleNode[]): RuleNode => ({
      ...state.hash[virtualNode.id],
      checked: checked(virtualNode.id, children),
      children,
    });

    return state.tree.map(node => this.executePostOrder(node, fn));
  }

  private executePostOrder<T>(parent, fn: (p, c) => T): T {
    const children = parent.children?.map(child => this.executePostOrder(child, fn));
    return fn(parent, children);
  }

  private fetchTreeApi(): Observable<RuleNode[]> {
    const serverUrl = 'https://raw.githubusercontent.com/jimmymadrigalGL';
    const contentId = 'tree.json';
    const url = `${serverUrl}/pimp-my-ng/master/src/${contentId}`;
    return from(fetch(url).then(res => res.json()));
  }

}
