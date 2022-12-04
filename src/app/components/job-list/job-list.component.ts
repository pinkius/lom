import { Component, OnInit } from '@angular/core';
import { JobFamily, JobsService, JobDefinition } from 'src/app/services/jobs.service';

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.scss']
})
export class JobListComponent implements OnInit {

  constructor(private jobsService: JobsService) { }

  jobFamilies: JobFamily[] = [];

  ngOnInit(): void {
    this.jobFamilies = this.jobsService.getJobFamilies();
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
}
