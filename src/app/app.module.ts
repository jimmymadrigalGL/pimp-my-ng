import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { TreeComponent } from './tree/tree.component';
import { NodeComponent } from './node/node.component';

@NgModule({
  imports: [BrowserModule, FormsModule],
  declarations: [AppComponent, TreeComponent, NodeComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
