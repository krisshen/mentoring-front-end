import {Skill} from "./skill";

export class Staff {

  id: string;
  name: string;
  email: string;
  // mentorSkills: Skill[]
  // menteeSkills: Skill[]
  mentorSkills: string[];
  menteeSkills: string[];

  constructor(jsonData: any) {
    this.id = jsonData.id;
    this.name = jsonData.name;
    this.email = jsonData.email;
    this.mentorSkills = jsonData.mentorSkills;
    this.menteeSkills = jsonData.menteeSkills;
  }
}
