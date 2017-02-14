import { Pipe, PipeTransform } from '@angular/core';

import { Staff } from "../entities/staff";

@Pipe({
  name: 'staffFilter'
})
export class StaffFilterPipe implements PipeTransform {

  transform(allStaff: Staff[], skill: string, role: string): Staff[] {
    if (!allStaff) {
      return null;
    } else if (role == 'mentee') {
      return allStaff.filter(mentee => mentee.menteeSkills.indexOf(skill) > -1)
    } else {
      return allStaff.filter(mentee => mentee.mentorSkills.indexOf(skill) > -1)
    }
  }

}
