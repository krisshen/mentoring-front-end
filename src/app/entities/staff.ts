export class Staff {
  id: string;
  name: string;
  email: string;
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
