import { Component, OnInit } from '@angular/core';
import {CategoryService} from "../../services/category.service";
import {Category} from "../../entities/category";
import {SkillService} from "../../services/skill.service";
import {Skill} from "../../entities/skill";
import {CategorydialogComponent} from "../categorydialog/categorydialog.component"
import {MdDialog} from "@angular/material";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private categoryService: CategoryService, private skillService: SkillService, private _dialog: MdDialog) { }

  allCategories: Category[]
  allSkills: Skill[]
  lastDialogResult: string

  ngOnInit() {
    this.categoryService.getAllCategories()
      .subscribe(
        data => this.allCategories = data,
        error => alert(error),
        () => (this.categoryService.isAllCategoriesLoaded = true,
          console.log('Get All Categories Complete!'))
      )
    this.allSkills = this.skillService.allSkills
  }

  upsertCategory(categoryName: string, description: string) {
    console.log("admin.component.upsertCategory: " + categoryName + ', ' + description)

    this.categoryService.upsertCategory(new Category({id: categoryName.trim().replace(' ','').toLowerCase(), name: categoryName, description: description}))
      .subscribe(
        data => console.log(data),
        error => alert(error),
        () => console.log('Post a Category Complete!')
      )
  }

  openCategoryDialog(category_id: string) {

    console.log('category dialog opened')
    this.skillService.getSkillsByCategoryID(category_id)

    let dialogRef = this._dialog.open(CategorydialogComponent)
    dialogRef.afterClosed().subscribe(result => {
      this.lastDialogResult = result;
    })
  }
}
