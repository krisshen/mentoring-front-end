import { Pipe, PipeTransform } from '@angular/core';

import { Match } from '../entities/match';

@Pipe({
  name: 'matchFilter'
})
export class MatchFilterPipe implements PipeTransform {

  transform(allMatches: Match[], skill: string): Match[] {
    if (!allMatches) {
      return null;
    } else {
      return allMatches.filter(match => match.skill === skill)
    }
  }

}
