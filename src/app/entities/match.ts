/**
 * Created by Di on 14/02/17.
 */
export class Match {
  mentor: string;
  mentee: string;
  skill: string;

  constructor(jsonData: any) {
    this.mentor = jsonData.mentor;
    this.mentee = jsonData.mentee;
    this.skill = jsonData.skill;
  }
}
