import { Component, OnInit } from '@angular/core';
import { JobFamily, JobsService, LomJob } from 'src/app/services/jobs.service';

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

  incrementJob(job: LomJob) {
    this.jobsService.incrementJob(job, 1);
  }

  getJobPercentComplete(job: LomJob): number {
    return job.currentXp;
  }

}
