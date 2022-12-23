import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-article-cud',
  templateUrl: './article-cud.component.html',
  styleUrls: ['./article-cud.component.scss']
})
export class ArticleCudComponent implements OnInit {

  isCreate: boolean = false;
  isEdit: boolean = false;
  isDelete: boolean = false;

  constructor(
    private route: ActivatedRoute
  ) { }
    
  ngOnInit(): void {
    const { isCreate, isDelete, isEdit } = (this.route.snapshot.data as { isCreate: null | boolean, isDelete: null | boolean, isEdit: null | boolean });
    this.isCreate = !!isCreate;
    this.isEdit = !!isEdit;
    this.isDelete = !!isDelete;
  }
}
