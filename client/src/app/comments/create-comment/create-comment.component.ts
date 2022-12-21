import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CommentModel } from '../+store/models';
import { CreateCommentTextErrorStateMatcher } from './create-comment-text-error-state-matcher';
import { Subscription, first } from 'rxjs';
import { UserModel } from 'src/app/auth/+store/models';

const textErrorStateMatcher = new CreateCommentTextErrorStateMatcher();

@Component({
  selector: 'app-create-comment',
  templateUrl: './create-comment.component.html',
  styleUrls: ['./create-comment.component.scss']
})
export class CreateCommentComponent implements OnInit {

  private subscriptions: Subscription[] = [];

  isCreatingComment$ = this.commentModel.isCreating$;
  isLoggedIn$ = this.userModel.isLoggedIn$;
  @Input() articleId!: string;
  textErrorStateMatcher = textErrorStateMatcher;

  commentForm = this.fb.group({
    text: ['', [Validators.required]]
  });

  constructor(
    private fb: FormBuilder,
    private commentModel: CommentModel,
    private userModel: UserModel
  ) { }

  ngOnInit() {
    this.isLoggedIn$.pipe(first()).subscribe(isLoggedIn => {
      this.setDisable(!isLoggedIn);
      if (isLoggedIn) {
        const subscription = this.isCreatingComment$.subscribe(x => this.setDisable(x));
        this.subscriptions.push(subscription);
      }
    });
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

  private setDisable(x: boolean) {
    const textControl = this.commentForm.controls['text'];
    x ? textControl?.disable() : textControl?.enable();
  }
}
