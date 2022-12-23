import { Component, Input, OnInit } from '@angular/core';

import { first } from 'rxjs';
import { UserModel } from 'src/app/auth/+store/models';
import { defaultImageUrl } from 'src/app/core/constants';
import { IArticle } from 'src/app/core/interfaces/article';

@Component({
  selector: 'app-article-card',
  templateUrl: './article-card.component.html',
  styleUrls: ['./article-card.component.scss']
})
export class ArticleCardComponent implements OnInit {

  @Input() article!: IArticle;

  isOwner: boolean = false;

  get cardImageStyle() {
    return `background-image: url("${this.article.imageUrl || defaultImageUrl}")`;
  }

  constructor(
    private userModel: UserModel
  ) { }

  ngOnInit() {
    this.userModel.user$.pipe(first()).subscribe(user => {
      this.isOwner = user?._id === this.article.user._id;
    });
  }
}
