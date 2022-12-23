import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ArticleDetailsModel } from '../+store/models';
import { first } from 'rxjs';
import { UserModel } from 'src/app/auth/+store/models';
import { defaultImageUrl } from 'src/app/core/constants';

@Component({
  selector: 'app-article-details',
  templateUrl: './article-details.component.html',
  styleUrls: ['./article-details.component.scss']
})
export class ArticleDetailsComponent implements OnInit, OnDestroy {

  article$ = this.articleDetailsModel.article$;
  isLoading$ = this.articleDetailsModel.isLoading$;
  
  defaultImageUrl = defaultImageUrl
  isOwner: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private articleDetailsModel: ArticleDetailsModel,
    private router: Router,
    private userModel: UserModel
  ) { }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('articleId')!;
    this.articleDetailsModel.loadArticle(id);
    this.articleDetailsModel.loadArticleFailure$.pipe(first())
      .subscribe(() => this.router.navigateByUrl('/404', { skipLocationChange: true }));

    // TODO: FIX CALLBACK HELL
    this.articleDetailsModel.loadArticleSuccess$.pipe(first())
      .subscribe(({ article }) => {
        this.userModel.user$.pipe(first()).subscribe(user => {
          this.isOwner = user?._id === article.user._id;
        });
      })
  }

  ngOnDestroy() {
    this.articleDetailsModel.handleDestroy();
  }
}
