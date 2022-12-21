import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';


import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { CommentModuleEffects } from './+store/effects';
import { commentsModuleStoreName, commentsReducers } from './+store/reducers';
import { CommentsSectionComponent } from './comments-section/comments-section.component';
import { CommentCardComponent } from './comment-card/comment-card.component';
import { CreateCommentComponent } from './create-comment/create-comment.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    CommentsSectionComponent,
    CommentCardComponent,
    CreateCommentComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    MatInputModule,
    ReactiveFormsModule,
    SharedModule,

    // Store
    StoreModule.forFeature(commentsModuleStoreName, commentsReducers),
    EffectsModule.forFeature([CommentModuleEffects]),

    // Material
    MatCardModule,
    MatDividerModule,
    MatButtonModule
  ],
  exports: [
    CommentsSectionComponent
  ]
})
export class CommentsModule { }
