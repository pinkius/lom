import { Injectable } from '@angular/core';
import { CheckboxRequiredValidator } from '@angular/forms';
import { Subscription, interval } from 'rxjs';
import { JOB_FAMILIES } from './jobs';

@Injectable({
  providedIn: 'root'
})
export class JobsService {

  constructor() { }

  private player: Player = { cash: 0 };

  private timerSubscription: Subscription|null = null;

  public getJobFamilies(): JobFamily[] {
    return JOB_FAMILIES;
  }

  public getPlayer(): Player {
    return this.player;
  }

  public activateJob(job: JobDefinition) {
    const fam = JOB_FAMILIES.find(f => f.id === 'work');
    if (fam) {
      fam.activeJobId = job.id;
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

  private getJobLevel(jobId: string): number {
    var level = 0;
    JOB_FAMILIES.forEach(family => {
      const j = family.jobs.find(job => jobId === job.id);
      if (j) {
        level = j.currentLevel;
      }
    });
    return level;
  }

  // Come back to this - see if it needs preformance improvements (eg just find jobs which depend on the one being incremented)
  private checkRequirements() {
    JOB_FAMILIES.forEach(family => {
      family.jobs.forEach(j => {
        j.displayed = j.displayRequirements.map((predicate) => { return this.getJobLevel(predicate.jobId) >= predicate.minimumLevel }).reduce((previous, current) => { return previous && current}, true);
      });
    });
  }

  private incrementActivities() {
    JOB_FAMILIES.forEach(family => {
      const job = family.jobs.find(j => family.activeJobId === j.id);
      if (job) {
        this.incrementJob(job, 1);
        this.incrementSalary(job);
      }
    });
  }

  public getDisplayed(jobId: string): boolean {
    console.info("Hello: " + jobId);
    return true;
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
  jobs: JobDefinition[];
  activeJobId: string
}

export interface JobDefinition {
  id: string;
  displayName: string;
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

}