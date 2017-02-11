import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';

import { Observable } from "rxjs";

import { Category } from "../entities/category";

@Injectable()
export class CategoryService {

  private allCategoriesUrl = 'http://localhost:8080/categories';
  private upsertCategoryUrl = 'http://localhost:8080/category/';

  isAllCategoriesLoaded: boolean;

  constructor(private http: Http) {
  }

  getAllCategories(): Observable<any> {
    console.log('CategoryService.getAllCategories ...');

    return this.http
      .get(this.allCategoriesUrl)
      .map(res => res.json())
  }

  upsertCategory(category: Category) {
    console.log('CategoryService.upsertCategory to ' + this.upsertCategoryUrl + category.id);
    console.log('Body is: \n' + JSON.stringify(category));

    return this.http
      .post(this.upsertCategoryUrl + category.id, category, {headers: new Headers({'Content-Type': 'application/json'})} )
      .map(res => res.toString())
      .catch((error:any) => Observable.throw('Server error'));
  }
}
