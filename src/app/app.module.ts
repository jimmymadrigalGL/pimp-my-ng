import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TreeComponent } from './tree/tree.component';
import { NodeComponent } from './node/node.component';
import { ApiService } from './services/api.service';
import { Observable, of } from 'rxjs';

@NgModule({
  imports: [BrowserModule],
  declarations: [AppComponent, TreeComponent, NodeComponent],
  bootstrap: [AppComponent],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [ApiService]
    }
  ]
})
export class AppModule {}

function initializeApp(api: ApiService): Observable<any> {
  api.fetchTree();
  return of(null);
}
