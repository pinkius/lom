import { Injectable } from '@angular/core';
import { Subscription, interval } from 'rxjs';
import { ALL_JOBS } from './jobs';

@Injectable({
  providedIn: 'root'
})
export class JobsService {

  constructor() { }

  private player: Player = { cash: 0, activeWorkJobId: 'intern', activeStudyJobId: 'concentration' };

  private timerSubscription: Subscription|null = null;

  public getPlayer(): Player {
    return this.player;
  }

  public activateJob(job: JobDefinition) {
    if (job.family === 'work') {
      this.player.activeWorkJobId = job.id;
    } else if (job.family === 'study') {
      this.player.activeStudyJobId = job.id;
    }
  }

  public incrementJob(job: JobDefinition, xpIncrement: number) {
    job.currentXp += xpIncrement;
    if (job.currentXp >= job.nextLevelXp) {
      job.currentLevel++;
      job.currentXp = 0;

      this.checkRequirements();
    }
  }

  private incrementSalary(job: JobDefinition) {
    if (job.baseSalary) {
      this.player.cash += job.baseSalary * (job.currentLevel + 1);
    }
  }

  private getJobFromId(jobId: string): JobDefinition|undefined {
    return ALL_JOBS.find(job => jobId === job.id);
  }

  private getJobLevel(jobId: string): number {
    var level = 0;

    const j = this.getJobFromId(jobId);
    if (j) {
      level = j.currentLevel;
    }
    return level;
  }

  // Come back to this - see if it needs preformance improvements (eg just find jobs which depend on the one being incremented)
  private checkRequirements() {
    ALL_JOBS.forEach(j => {
      j.displayed = j.displayRequirements.map((predicate) => { return this.getJobLevel(predicate.jobId) >= predicate.minimumLevel }).reduce((previous, current) => { return previous && current}, true);
    });
  }

  private incrementActivities() {
    const workJob = this.getJobFromId(this.player.activeWorkJobId);
    if (workJob) {
      this.incrementJob(workJob, 1);
      this.incrementSalary(workJob);
    }
    const studyJob = this.getJobFromId(this.player.activeStudyJobId);
    if (studyJob) {
      this.incrementJob(studyJob, 1);
    }
  }

  public getJobsForFamily(family: string): JobDefinition[] {
    return ALL_JOBS.filter(job => job.family === family);
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

export interface JobDefinition {
  id: string;
  displayName: string;
  family: string;
  baseSalary?: number;
  currentLevel: number;
  currentXp: number;
  nextLevelXp: number;
  displayed: boolean;
  selectable: boolean;
  displayRequirements: JobPredicate[];
  selectableRequirements: JobPredicate[];
}

export interface JobPredicate {
  jobId: string;
  minimumLevel: number;
}

export interface Player {
  cash: number;
  activeWorkJobId: string;
  activeStudyJobId: string;
}