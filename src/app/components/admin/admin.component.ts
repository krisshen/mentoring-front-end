import { Component, OnInit } from '@angular/core';
import {CategoryService} from "../../services/category.service";
import {Category} from "../../entities/category";
import {SkillService} from "../../services/skill.service";
import {Skill} from "../../entities/skill";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private categoryService: CategoryService, private skillService: SkillService) { }

  allCategories: Category[]
  allSkills: Skill[]

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


}
