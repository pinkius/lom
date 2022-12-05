import { Component, OnInit } from '@angular/core';
import { JobsService, JobDefinition } from 'src/app/services/jobs.service';

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.scss']
})
export class JobListComponent implements OnInit {

  constructor(private jobsService: JobsService) { }

  jobFamilies: Map<string, string> = new Map<string, string>([
    ["work", "Work"],
    ["study", "Study"]
  ]);

  ngOnInit(): void {
    this.jobsService.startEventTimer();
  }

  incrementJob(job: JobDefinition) {
    this.jobsService.incrementJob(job, 50);
  }

  getJobPercentComplete(job: JobDefinition): number {
    return job.currentXp;
  }

  getDisplayed(job: JobDefinition): boolean {
    return job.displayed;
  }

  getCash(): number {
    return this.jobsService.getPlayer().cash;
  }

  activateJob(job: JobDefinition) {
    this.jobsService.activateJob(job);
  }

  getJobsForFamily(family: string): JobDefinition[] {
    return this.jobsService.getJobsForFamily(family);
  }

  getProgressBarTypeForJob(job: JobDefinition): string {
    return (job.id === this.jobsService.getPlayer().activeWorkJobId || job.id === this.jobsService.getPlayer().activeStudyJobId)?"success":"warning";
  }
}
