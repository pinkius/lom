import { JobDefinition } from "./jobs.service";

export const ALL_JOBS: JobDefinition[] = [
    { id: 'intern', displayName: 'Intern', family: 'work', baseSalary: 1, currentLevel: 0, currentXp: 0, nextLevelXp: 100, displayed: true, selectable: true, displayRequirements: [], selectableRequirements: []},
    { id: 'newbie', displayName: 'Newbie', family: 'work', baseSalary: 100, currentLevel: 0, currentXp: 0, nextLevelXp: 100, displayed: false, selectable: false, displayRequirements: [ {jobId: 'intern', minimumLevel: 5 } ], selectableRequirements: [ {jobId: 'intern', minimumLevel: 5 } ]},
    { id: 'seasoned', displayName: 'Seasoned Worker', family: 'work', baseSalary: 200, currentLevel: 0, currentXp: 0, nextLevelXp: 100, displayed: false, selectable: false, displayRequirements: [ {jobId: 'newbie', minimumLevel: 5 } ], selectableRequirements: [ {jobId: 'newbie', minimumLevel: 5 } ]},
    { id: 'assman', displayName: 'Assistant Manager', family: 'work', baseSalary: 300, currentLevel: 0, currentXp: 0, nextLevelXp: 100, displayed: false, selectable: false, displayRequirements: [ {jobId: 'seasoned', minimumLevel: 5 } ], selectableRequirements: [ {jobId: 'seasoned', minimumLevel: 5 } ]},
    { id: 'concentration', displayName: 'Concentration', family: 'study', currentLevel: 0, currentXp: 0, nextLevelXp: 100, displayed: true, selectable: true, displayRequirements: [], selectableRequirements: []},
    { id: 'fitness', displayName: 'Fitness', family: 'study', currentLevel: 0, currentXp: 0, nextLevelXp: 100, displayed: true, selectable: true, displayRequirements: [], selectableRequirements: []},
  ];