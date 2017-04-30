import {Injectable} from '@angular/core';
import {Headers, Http} from '@angular/http';
import {Observable} from "rxjs";
import {Category} from "../entities/category";
import {environment} from 'app/../environments/environment';

@Injectable()
export class CategoryService {

  // private allCategoriesUrl = 'http://localhost:8080/categories';
  // private upsertCategoryUrl = 'http://localhost:8080/category/';
  private allCategoriesUrl //= '/categories';
  private upsertCategoryUrl //= '/category/';

  isAllCategoriesLoaded: boolean = false;

  constructor(private http: Http) {
    if (environment.production) {
      this.allCategoriesUrl = '/categories';
      this.upsertCategoryUrl = '/category/';
    }
    else {
      this.allCategoriesUrl = 'http://localhost:8080/categories';
      this.upsertCategoryUrl = 'http://localhost:8080/category/';
    }
  }

  getAllCategories(): Observable<any> {
    console.log('CategoryService.getAllCategories ...');

    return this.http
      .get(this.allCategoriesUrl)
      .map(res => res.json())
  }

  upsertCategory(category: Category) {
    console.log('CategoryService.upsertCategory to ' + this.upsertCategoryUrl + category.name);
    console.log('Body is: \n' + JSON.stringify(category));

    return this.http
      .post(this.upsertCategoryUrl + category.name, category, {headers: new Headers({'Content-Type': 'application/json'})})
      .map(res => res.toString())
      .catch((error: any) => Observable.throw('Server error'));
  }
}
