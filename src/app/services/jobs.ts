import { JobDefinition, JobFamily } from "./jobs.service";

export const WORK_JOBS: JobDefinition[] = [
    { id: 'intern', displayName: 'Intern', baseSalary: 1, currentLevel: 0, currentXp: 0, nextLevelXp: 100, displayed: true, selectable: true, displayRequirements: [], selectableRequirements: []},
    { id: 'newbie', displayName: 'Newbie', baseSalary: 100, currentLevel: 0, currentXp: 0, nextLevelXp: 100, displayed: false, selectable: false, displayRequirements: [ {jobId: 'intern', minimumLevel: 5 } ], selectableRequirements: [ {jobId: 'intern', minimumLevel: 5 } ]},
    { id: 'seasoned', displayName: 'Seasoned Worker', baseSalary: 200, currentLevel: 0, currentXp: 0, nextLevelXp: 100, displayed: false, selectable: false, displayRequirements: [ {jobId: 'newbie', minimumLevel: 5 } ], selectableRequirements: [ {jobId: 'newbie', minimumLevel: 5 } ]},
    { id: 'assman', displayName: 'Assistant Manager', baseSalary: 300, currentLevel: 0, currentXp: 0, nextLevelXp: 100, displayed: false, selectable: false, displayRequirements: [ {jobId: 'seasoned', minimumLevel: 5 } ], selectableRequirements: [ {jobId: 'seasoned', minimumLevel: 5 } ]},
    
  ];

export const STUDY_JOBS: JobDefinition[] = [
    { id: 'concentration', displayName: 'Concentration', currentLevel: 0, currentXp: 0, nextLevelXp: 100, displayed: true, selectable: true, displayRequirements: [], selectableRequirements: []},
  ];

export const JOB_FAMILIES: JobFamily[] = [
    { id: 'work', displayName: 'Work', jobs: WORK_JOBS, activeJobId: 'intern' },
    { id: 'study', displayName: 'Study', jobs: STUDY_JOBS, activeJobId: 'concentration' }
  ]
