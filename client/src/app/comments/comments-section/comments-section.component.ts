import { Component, Input, OnInit } from '@angular/core';
import { CommentModel } from '../+store/models';

@Component({
  selector: 'app-comments-section',
  templateUrl: './comments-section.component.html',
  styleUrls: ['./comments-section.component.scss']
})
export class CommentsSectionComponent implements OnInit {
  @Input() articleId!: string;

  comments$ = this.commentModel.comments$;
  commentsAreLoading$ = this.commentModel.isLoading$;

  constructor(
    private commentModel: CommentModel
  ) { }

  ngOnInit() {
    this.commentModel.loadComments(this.articleId);
  }

  ngOnDestroy() {
    this.commentModel.handleDestroy();
  }
}
