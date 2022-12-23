import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { CommentsModule } from '../comments/comments.module';
import { SharedModule } from '../shared/shared.module';
import { ArticleModuleEffects } from './+store/effects';
import { articleModuleStoreName, articleReducers } from './+store/reducers';
import { ArticleCardComponent } from './article-card/article-card.component';
import { ArticleDetailsComponent } from './article-details/article-details.component';
import { ArticleListComponent } from './article-list/article-list.component';
import { ArticlesRoutingModule } from './articles-routing.module';



@NgModule({
  declarations: [
    ArticleListComponent,
    ArticleCardComponent,
    ArticleDetailsComponent,
  ],
  imports: [
    CommonModule,
    ArticlesRoutingModule,
    HttpClientModule,
    SharedModule,
    CommentsModule,

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
