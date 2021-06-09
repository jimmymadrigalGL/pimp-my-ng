import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularSvgIconModule } from 'angular-svg-icon';

import { AppComponent } from './app.component';
import { TreeComponent } from './tree/tree.component';
import { NodeComponent } from './node/node.component';
import { FacadeService } from './services/facade.service';
import { Observable, of } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [BrowserModule, HttpClientModule, AngularSvgIconModule.forRoot()],
  declarations: [AppComponent, TreeComponent, NodeComponent],
  bootstrap: [AppComponent],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [FacadeService]
    }
  ]
})
export class AppModule {}

function initializeApp(facade: FacadeService): Observable<any> {
  facade.fetchTree();
  return of(null);
}
