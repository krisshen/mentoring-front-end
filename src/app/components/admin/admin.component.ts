import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MdDialog, MdSnackBarConfig, MdSnackBar } from '@angular/material';

import { CategoryService } from '../../services/category.service';
import { SkillService } from '../../services/skill.service';
import { MatchService } from '../../services/match.service';

import { Category } from '../../entities/category';
import { Skill } from '../../entities/skill';

import { CategorydialogComponent } from '../categorydialog/categorydialog.component';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private router: Router, private categoryService: CategoryService, private skillService: SkillService, private matchService: MatchService, private _dialog: MdDialog, private snackBar: MdSnackBar) { }

  allCategories: Category[];
  allSkills: Skill[];
  lastDialogResult: string;
  rows = this.matchService.allMatch;
  columns = [
    { prop: 'mentor' },
    { name: 'Mentee' },
    { name: 'Skill' }
  ];

  ngOnInit() {
    this.categoryService.getAllCategories()
      .subscribe(
        data => this.allCategories = data,
        error => alert(error),
        () => (this.categoryService.isAllCategoriesLoaded = true,
          console.log('Get All Categories Complete!'))
      );
    this.allSkills = this.skillService.allSkills
  }

  upsertCategory(categoryName: string, description: string) {
    console.log("admin.component.upsertCategory: " + categoryName + ', ' + description);

    if (!categoryName || !description) {
      this.openSnackBar('Fail')
    } else {
      this.categoryService.upsertCategory(new Category({id: categoryName.trim().replace(' ','').toLowerCase(), name: categoryName, description: description}))
        .subscribe(
          data => (console.log(data),
            this.openSnackBar('Success')),
          error => alert(error),
          () => console.log('Post a Category Complete!')
        )
    }
  }

  openCategoryDialog(category_id: string) {

    console.log('category dialog opened');
    this.skillService.getSkillsByCategoryID(category_id)

    let dialogRef = this._dialog.open(CategorydialogComponent)
    dialogRef.afterClosed().subscribe(result => {
      this.lastDialogResult = result;
    })
  }

  gotoMain() {
    this.router.navigate(['/mentoring']);
  }

  openSnackBar(situation: string) {
    let config = new MdSnackBarConfig();
    config.duration = 1500;

    if (situation == 'Fail') {
      this.snackBar.open("Please enter category and description!", '', config);
    } else {
      this.snackBar.open("Category updated!", '', config);
    }
  }
}
