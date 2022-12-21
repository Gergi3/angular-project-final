import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CommentModel } from '../+store/models';
import { CreateCommentTextErrorStateMatcher } from './create-comment-text-error-state-matcher';
import { Subscription, first } from 'rxjs';

const textErrorStateMatcher = new CreateCommentTextErrorStateMatcher();

@Component({
  selector: 'app-create-comment',
  templateUrl: './create-comment.component.html',
  styleUrls: ['./create-comment.component.scss']
})
export class CreateCommentComponent implements OnInit {

  private subscriptions: Subscription[] = [];

  @Input() articleId!: string;
  textErrorStateMatcher = textErrorStateMatcher;
  isCreatingComment$ = this.commentModel.isCreating$;

  commentForm = this.fb.group({
    text: ['', [Validators.required]]
  });

  constructor(
    private fb: FormBuilder,
    private commentModel: CommentModel
  ) { }

  ngOnInit() {
    const subscription = this.isCreatingComment$.pipe().subscribe(isCreating => {
      const textControl = this.commentForm.controls['text'];
      isCreating
        ? textControl?.disable()
        : textControl?.enable();
    });
    this.subscriptions.push(subscription);
  }

  commentHandler() {
    if (this.commentForm.invalid) {
      this.commentForm.markAllAsTouched();
      return;
    }
    const text = this.commentForm.get('text')?.value!.replace(/\n\r?/g, '<br />')!;
    this.commentModel.createComment(this.articleId, text);
    
    this.commentForm.reset();
    this.commentForm.markAsPristine();
    this.commentForm.markAsUntouched();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(x => x.unsubscribe());
  }
}
