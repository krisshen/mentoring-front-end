import { Component, OnInit } from '@angular/core';
import {CategoryService} from "../../services/category.service";
import {Category} from "../../entities/category";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private categoryService: CategoryService) { }

  allCategories: Category[]


  ngOnInit() {
    this.categoryService.getAllCategories()
      .subscribe(
        data => this.allCategories = data,
        error => alert(error),
        () => (this.categoryService.isAllCategoriesLoaded = true,
          console.log('Get All Categories Complete!'))
      )
  }


}
