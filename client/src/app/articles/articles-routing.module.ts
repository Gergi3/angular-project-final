import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ArticleDetailsComponent } from './article-details/article-details.component';
import { ArticleCudComponent } from './article-cud/article-cud.component';
import { MyArticlesComponent } from './my-articles/my-articles.component';
import { AllArticlesComponent } from './all-articles/all-articles.component';

const routes: Routes = [
  {
    path: '',
    component: AllArticlesComponent
  },
  {
    path: 'my-articles',
    component: MyArticlesComponent
  },
  {
    path: 'create',
    component: ArticleCudComponent,
    data: {
      isCreate: true,
    }
  },
  {
    path: 'edit/:articleId',
    component: ArticleCudComponent,
    data: {
      isEdit: true,
    }
  },
  {
    path: 'delete/:articleId',
    component: ArticleCudComponent,
    data: {
      isDelete: true,
    }
  },
  {
    path: ':articleId',
    component: ArticleDetailsComponent,
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class ArticlesRoutingModule { }
