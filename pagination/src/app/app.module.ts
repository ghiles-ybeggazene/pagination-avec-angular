import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { TabsComponent } from './tabs/tabs.component';
import { ListComponent } from './list/list.component';
import { ItemComponent } from './list/item/item.component';

import { StarwarsService } from './starwars.service';

const routes = [
  { path: 'data', component: TabsComponent, children: [
    { path: '', redirectTo: 'people', pathMatch: 'full' },
    { path: ':dataType', component: ListComponent }
  ] },
  { path: '**', redirectTo: '/data/people' }
];

@NgModule({
  declarations: [
    AppComponent,
    TabsComponent,
    ListComponent,
    ItemComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    RouterModule.forRoot(routes)
  ],
  providers: [StarwarsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
