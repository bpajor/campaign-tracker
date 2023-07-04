import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponentComponent } from './header-component/header-component.component';
import { CampaignAddingSectionComponent } from './campaign-adding-section/campaign-adding-section.component';
import { AddingFormComponent } from './adding-form/adding-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ListSectionComponent } from './list-section/list-section.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponentComponent,
    CampaignAddingSectionComponent,
    AddingFormComponent,
    ListSectionComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgbModule,
    FormsModule
  ],
  providers: [ListSectionComponent, CampaignAddingSectionComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
