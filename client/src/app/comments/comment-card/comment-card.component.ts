import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable, first } from 'rxjs';
import { UserModel } from 'src/app/auth/+store/models';
import { IComment } from 'src/app/core/interfaces/comment';
import { CommentModel } from '../+store/models';
import { ErrorHelper } from 'src/app/core/helpers/error.helper';

@Component({
  selector: 'app-comment-card',
  templateUrl: './comment-card.component.html',
  styleUrls: ['./comment-card.component.scss']
})
export class CommentCardComponent implements OnInit {
  @Input() comment!: IComment;

  isLoggedIn$ = this.userModel.isLoggedIn$;
  isEditing$ = this.commentModel.isEditing$;
  isDeleting$ = this.commentModel.isDeleting$;

  editForm = this.fb.group({
    text: [this.comment?.text, [Validators.required]]
  });

  actionFailure: string | null = null;
  isOwner = false;
  isDelete = false;
  deleteConfirmed = false;
  isEdit = false;
  get isDefault(): boolean {
    return !(this.isDelete || this.isEdit);
  }

  get commentSubtitle(): string {
    return this.isDefault
      ? 'Comment'
      : this.isDelete ? 'Delete Comment' : 'Edit Comment'
  }

  constructor(
    private userModel: UserModel,
    private commentModel: CommentModel,
    private fb: FormBuilder,
    private errorHelper: ErrorHelper
  ) {
  }

  ngOnInit() {
    this.userModel.user$.pipe(first()).subscribe(user => {
      this.isOwner = user?._id === this.comment.user._id;
    });
  }

  enableDefault() {
    this.isEdit = false;
    this.isDelete = false;
    this.deleteConfirmed = false;
    this.actionFailure = null;
  }
  enableEdit() {
    this.editForm.patchValue({ text: this.comment.text });
    this.isEdit = true;
  }
  enableDelete() {
    this.isDelete = true;
  }
  confirmDelete() {
    this.deleteConfirmed = true;
  }

  // Handlers
  deleteHandler() {
    this.commentModel.deleteComment(this.comment._id);
    this.handleActionStream(this.commentModel.deleteCommentSuccess$, this.commentModel.deleteCommentFailure$)
  }

  editHandler() {
    if (this.editForm.invalid) {
      this.editForm.markAllAsTouched();
      return;
    }

    const text = this.editForm.get('text')?.value!;

    this.commentModel.editComment(this.comment._id, text);
    this.handleActionStream(this.commentModel.editCommentSuccess$, this.commentModel.editCommentFailure$)
  }

  private handleActionStream(success$: Observable<{ comment: IComment }>, failure$: Observable<{ error: any }>) {
    success$.pipe(first())
      .subscribe(() => this.enableDefault());
    failure$.pipe(first())
      .subscribe(({ error }) => this.actionFailure = this.errorHelper.getApiError(error));
  }
}
