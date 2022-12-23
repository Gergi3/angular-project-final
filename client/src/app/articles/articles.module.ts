import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { CommentsModule } from '../comments/comments.module';
import { SharedModule } from '../shared/shared.module';
import { ArticleModuleEffects } from './+store/effects';
import { articleModuleStoreName, articleReducers } from './+store/reducers';
import { AllArticlesComponent } from './all-articles/all-articles.component';
import { ArticleCardComponent } from './article-card/article-card.component';
import { ArticleCudComponent } from './article-cud/article-cud.component';
import { ArticleDetailsComponent } from './article-details/article-details.component';
import { ArticleListComponent } from './article-list/article-list.component';
import { ArticlesRoutingModule } from './articles-routing.module';
import { MyArticlesComponent } from './my-articles/my-articles.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ArticleListComponent,
    ArticleCardComponent,
    ArticleDetailsComponent,
    ArticleCudComponent,
    MyArticlesComponent,
    AllArticlesComponent,
  ],
  imports: [
    CommonModule,
    ArticlesRoutingModule,
    HttpClientModule,
    SharedModule,
    CommentsModule,
    ReactiveFormsModule,

    // Store
    StoreModule.forFeature(articleModuleStoreName, articleReducers),
    EffectsModule.forFeature([ArticleModuleEffects]),

    // Materials
    MatCardModule,
    MatButtonModule,
    MatGridListModule,
    MatInputModule,
    MatFormFieldModule
  ],
})
export class ArticlesModule { }
