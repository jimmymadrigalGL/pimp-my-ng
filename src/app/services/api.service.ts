import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { RuleNode } from '../models/rule-node';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private serverUrl = 'https://raw.githubusercontent.com/jimmymadrigalGL';
  private contentId = 'mock-tree.json';
  rulesUrl = (contentId: string) =>
    `${this.serverUrl}/pimp-my-angular/master/src/${contentId}`;

  fetchRules(): Observable<RuleNode[]> {
    return from(fetch(this.rulesUrl(this.contentId)).then(res => res.json()));
  }
}
