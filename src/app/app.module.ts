import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TreeComponent } from './tree/tree.component';
import { NodeComponent } from './node/node.component';

@NgModule({
  imports: [BrowserModule],
  declarations: [AppComponent, TreeComponent, NodeComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
