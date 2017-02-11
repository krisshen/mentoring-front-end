import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Observable } from "rxjs";

import { Category } from "../entities/category";

@Injectable()
export class CategoryService {

  private allCategoriesUrl = 'http://localhost:8080/categories';

  isAllCategoriesLoaded: boolean;

  constructor(private http: Http) {
  }

  getAllCategories(): Observable<any> {
    console.log('CategoryService.getAllCategories ...');

    return this.http
      .get(this.allCategoriesUrl)
      .map(res => res.json())
  }
}
