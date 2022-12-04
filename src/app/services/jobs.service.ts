import { Injectable } from '@angular/core';
import { Subscription, interval } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JobsService {

  constructor() { }

  WORK_JOBS: LomJob[] = [
    { id: 'intern', displayName: 'Intern', currentLevel: 0, currentXp: 0, nextLevelXp: 100},
    { id: 'newbie', displayName: 'Newbie', currentLevel: 0, currentXp: 0, nextLevelXp: 100}
  ];

  STUDY_JOBS: LomJob[] = [
    { id: 'concentration', displayName: 'Concentration', currentLevel: 0, currentXp: 0, nextLevelXp: 100},
  ];

  JOB_FAMILIES: JobFamily[] = [
    { id: 'work', displayName: 'Work', jobs: this.WORK_JOBS, activeJobId: 'intern' },
    { id: 'study', displayName: 'Study', jobs: this.STUDY_JOBS, activeJobId: 'concentration' }
  ]

  private timerSubscription: Subscription|null = null;

  public getJobFamilies(): JobFamily[] {
    return this.JOB_FAMILIES;
  }

  public incrementJob(job: LomJob, xpIncrement: number) {
    job.currentXp += xpIncrement;
    if (job.currentXp >= job.nextLevelXp) {
      job.currentLevel++;
      job.currentXp = 0;
    }
  }

  private incrementActivities() {
    this.JOB_FAMILIES.forEach(family => {
      const job = family.jobs.find(j => family.activeJobId === j.id);
      if (job) {
        this.incrementJob(job, 1);
      }
    });
  }

  startEventTimer() {
    if (!this.timerSubscription) {
      this.timerSubscription = interval(1000).subscribe(
        () => {
          this.incrementActivities();
       });
    }
  }
}

export interface JobFamily {
  id: string;
  displayName: string;
  jobs: LomJob[];
  activeJobId: string
}

export interface LomJob {
  id: string;
  displayName: string;
  currentLevel: number;
  currentXp: number;
  nextLevelXp: number;
}
