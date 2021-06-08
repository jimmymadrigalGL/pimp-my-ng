import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { RuleNode } from '../models/rule-node.model';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private serverUrl = 'https://raw.githubusercontent.com/jimmymadrigalGL';
  private contentId = 'tree.json';
  rulesUrl = (contentId: string) =>
    `${this.serverUrl}/pimp-my-ng/master/src/${contentId}`;

  fetchTree(): Observable<RuleNode[]> {
    return from(fetch(this.rulesUrl(this.contentId)).then(res => res.json()));
  }
}
