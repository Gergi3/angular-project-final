import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { descriptionValidators, imageUrlValidators, summaryValidators, titleValidators } from 'src/app/core/validators/reactive-validators';
import { ArticleDetailsModel, ArticleListModel } from '../+store/models';
import { IArticle, ICreateArticlesArgs, IEditArticlesArgs } from 'src/app/core/interfaces/article';
import { Observable, first, map, mapTo, merge, shareReplay } from 'rxjs';
import { ErrorHelper } from 'src/app/core/helpers/error.helper';

@Component({
  selector: 'app-article-cud',
  templateUrl: './article-cud.component.html',
  styleUrls: ['./article-cud.component.scss']
})
export class ArticleCudComponent implements OnInit {

  isDoingAction$ = merge(
    [false],
    this.articleListModel.isDoingAction$.pipe(map(x => x)),
    this.articleDetailsModel.isLoading$.pipe(map(x => x)),
  ).pipe(shareReplay(1));

  article$ = this.articleDetailsModel.article$;
  
  articleId: null | string = null;
  actionFailure: string | null = null;

  form = this.fb.group({
    title: ['', titleValidators],
    summary: ['', summaryValidators],
    description: ['', descriptionValidators],
    imageUrl: ['', imageUrlValidators]
  });

  isCreate: boolean = false;
  isEdit: boolean = false;
  isDelete: boolean = false;
  get text() {
    if (this.isCreate) { return 'Create' }
    if (this.isEdit) { return 'Edit' }
    if (this.isDelete) { return 'Delete' }
    return '';
  }

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private articleListModel: ArticleListModel,
    private articleDetailsModel: ArticleDetailsModel,
    private errorHelper: ErrorHelper
  ) { }

  ngOnInit(): void {
    this.articleId = this.route.snapshot.params?.['articleId'];
    const { isCreate, isDelete, isEdit } = (this.route.snapshot.data as { isCreate: null | boolean, isDelete: null | boolean, isEdit: null | boolean });
    this.isCreate = !!isCreate;
    this.isEdit = !!isEdit;
    this.isDelete = !!isDelete;
    
    if (this.isEdit || this.isDelete) {
      this.article$.subscribe(article => {
        this.form.patchValue({
          title: article?.title,
          summary: article?.summary,
          description: article?.description,
          imageUrl: article?.imageUrl
        });
      });

      this.articleDetailsModel.loadArticle(this.articleId!);
    }
    if (this.isDelete) { this.form.disable() }
  }

  submitHandler() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { title, summary, description, imageUrl } = this.form.value
    const formValues = {
      title: title!,
      summary: summary!,
      description: description!,
      imageUrl: imageUrl || null
    }

    switch (true) {
      case this.isCreate:
        this.createHandler(formValues)
        break;
      case this.isDelete:
        this.deleteHandler()
        break;
      case this.isEdit:
        this.editHandler({ articleId: this.articleId!, ...formValues })
        break;
    }
  }

  createHandler(args: ICreateArticlesArgs) {
    this.articleListModel.createArticle(args);
    this.handleActionResults(this.articleListModel.createArticleSuccess$, this.articleListModel.createArticleFailure$)
  }

  editHandler(args: IEditArticlesArgs) {
    this.articleListModel.editArticle(args);
    this.handleActionResults(this.articleListModel.editArticleSuccess$, this.articleListModel.editArticleFailure$)
  }

  deleteHandler() {
    this.articleListModel.deleteArticle(this.articleId!);
    this.handleActionResults(this.articleListModel.deleteArticleSuccess$, this.articleListModel.deleteArticleFailure$)
  }

  cancelHandler() {
    this.router.navigate(['/']);
  }

  ngOnDestroy() {
    this.articleDetailsModel.handleDestroy();
  }

  private handleActionResults(success$: Observable<{ article: IArticle }>, failure$: Observable<{ error: any }>) {
    success$.pipe(first())
      .subscribe(({ article }) => {
        if (!this.isDelete) {
          this.router.navigate(['/articles', article._id]);
        } else {
          this.router.navigate(['/articles']);
        }
      });

    failure$.pipe(first())
      .subscribe(({ error }) => this.actionFailure = this.errorHelper.getApiError(error));
  }
}
