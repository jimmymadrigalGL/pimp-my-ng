import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { RuleNode } from '../models/rule-node.model';
import { ApiService } from './api.service';

interface VirtualNode {
  id: string;
  children: VirtualNode[];
}

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
  private state$ = new BehaviorSubject<State>(this.initialState);

  tree$ = this.state$.pipe(map(state => this.unpackTree(state)));

  constructor(private apiService: ApiService) {}

  fetchTree() {
    this.apiService
      .fetchTree()
      .subscribe(list => this.state$.next(this.createTree(list)));
  }

  checkNode(id: string | number, check = true) {
    const state = this.state$.value;
    const checked = {
      ...state.checked
    };
    if (check) {
      checked[id] = true;
    } else {
      delete checked[id];
    }
    this.state$.next({
      ...state,
      checked
    });
  }

  private createTree(list: RuleNode[]): State {
    const hash = list.reduce(
      (state, node) => ({
        ...state,
        ...this.hashNode(node)
      }),
      {}
    );
    const tree = list.map(node => this.virtualizeNode(node));
    return {
      ...this.initialState,
      hash,
      tree,
      checked: {}
    };
  }

  private virtualizeNode(node: RuleNode): VirtualNode {
    const children = node.children.map(child => this.virtualizeNode(child));
    return {
      id: node.index.toString(),
      children
    };
  }

  private hashNode(node: RuleNode): { [key: string]: RuleNode } {
    return node.children.reduce(
      (hash, child) => ({
        ...hash,
        ...this.hashNode(child)
      }),
      {
        [node.index]: node
      }
    );
  }

  private unpackTree(state: State): RuleNode[] {
    return state.tree.map(node => this.unpackNode(node, state));
  }

  private unpackNode(virtualNode: VirtualNode, state: State): RuleNode {
    const node = state.hash[virtualNode.id];
    const children = virtualNode.children.map(child =>
      this.unpackNode(child, state)
    );
    const checked =
      state.checked[virtualNode.id] ||
      (children.length > 0 && children.every(child => child.checked));
    return {
      ...node,
      children,
      checked
    };
  }
}
