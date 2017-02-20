import { Component, OnInit } from '@angular/core';

import { SkillService } from "../../services/skill.service";

import { Skill } from "../../entities/skill";

@Component({
  selector: 'app-categorydialog',
  templateUrl: './categorydialog.component.html',
  styleUrls: ['./categorydialog.component.css']
})
export class CategorydialogComponent implements OnInit{

  constructor(private skillService: SkillService) { }

  skillsByCategoryID: Skill[];

  ngOnInit() {
    this.skillsByCategoryID = this.skillService.skillsByCategoryID
  }
}
