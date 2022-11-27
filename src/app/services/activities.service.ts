import { Injectable } from '@angular/core';
import { Subscription, interval } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActivitiesService {

  constructor() { }

  ALL_JOBS: LomJob[] = [
    { id: 'intern', displayName: 'Intern', currentLevel: 0, currentXp: 0, nextLevelXp: 100},
    { id: 'newbie', displayName: 'Newbie', currentLevel: 0, currentXp: 0, nextLevelXp: 100}
  ];

  private timerSubscription: Subscription|null = null;

  public getAllJobs(): LomJob[] {
    return this.ALL_JOBS;
  }

  public incrementJob(job: LomJob, xpIncrement: number) {
    job.currentXp += xpIncrement;
    if (job.currentXp >= job.nextLevelXp) {
      job.currentLevel++;
      job.currentXp = 0;
    }
  }

  startEventTimer() {

    console.log("Starting it");
    if (!this.timerSubscription) {
      this.timerSubscription = interval(1000).subscribe(
        () => {
         this.ALL_JOBS.forEach((job) => {
           this.incrementJob(job, 1);
         })
       });
    }

  }

}

export interface LomJob {
  id: string;
  displayName: string;
  currentLevel: number;
  currentXp: number;
  nextLevelXp: number;
}
