import {Component, Optional, OnInit} from '@angular/core';
import {MdDialogRef} from "@angular/material";
import {SkillService} from "../../services/skill.service";
import {Skill} from "../../entities/skill";

@Component({
  selector: 'app-categorydialog',
  templateUrl: './categorydialog.component.html',
  styleUrls: ['./categorydialog.component.css']
})
export class CategorydialogComponent implements OnInit{

  constructor(@Optional() public dialogRef: MdDialogRef<CategorydialogComponent>, private skillService: SkillService) { }

  skillsByCategoryID: Skill[]

  ngOnInit() {
    this.skillsByCategoryID = this.skillService.skillsByCategoryID
  }
}
