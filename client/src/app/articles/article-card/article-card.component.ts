import { Component, Input, OnInit } from '@angular/core';
import { first } from 'rxjs';
import { UserModel } from 'src/app/auth/+store/models';

import { IArticle } from 'src/app/core/interfaces/article';

@Component({
  selector: 'app-article-card',
  templateUrl: './article-card.component.html',
  styleUrls: ['./article-card.component.scss']
})
export class ArticleCardComponent implements OnInit {
  
  @Input() article!: IArticle;

  isOwner: boolean = false;
  defaultImageUrl = '/assets/placeholder-600x400.webp';

  get cardImageStyle() {
    return `background-image: url("${this.article.imageUrl || this.defaultImageUrl}")`;
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
