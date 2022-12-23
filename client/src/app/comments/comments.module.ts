import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { SharedModule } from '../shared/shared.module';
import { CommentModuleEffects } from './+store/effects';
import { commentsModuleStoreName, commentsReducers } from './+store/reducers';
import { CommentCardComponent } from './comment-card/comment-card.component';
import { CommentsSectionComponent } from './comments-section/comments-section.component';
import { CreateCommentComponent } from './create-comment/create-comment.component';

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
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatNativeDateModule
  ],
  exports: [
    CommentsSectionComponent
  ]
})
export class CommentsModule { }
