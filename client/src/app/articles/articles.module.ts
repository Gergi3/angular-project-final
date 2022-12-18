import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';

import { ArticlesRoutingModule } from './articles-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ArticleListComponent } from './article-list/article-list.component';
import { ArticleCardComponent } from './article-card/article-card.component';
import { HttpClientModule } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';
import { ArticleModuleEffects } from './+store/effects';
import { StoreModule } from '@ngrx/store';
import { articleModuleStoreName, articleReducers } from './+store/reducers';



@NgModule({
  declarations: [
    ArticleListComponent,
    ArticleCardComponent,
  ],
  imports: [
    CommonModule,
    ArticlesRoutingModule,
    HttpClientModule,
    SharedModule,

    // Store
    StoreModule.forFeature(articleModuleStoreName, articleReducers),
    EffectsModule.forFeature([ArticleModuleEffects]),

    // Materials
    MatCardModule,
    MatButtonModule,
    MatGridListModule
  ],
})
export class ArticlesModule { }
