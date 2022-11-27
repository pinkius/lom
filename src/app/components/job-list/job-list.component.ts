import { Component, OnInit } from '@angular/core';
import { ActivitiesService, LomJob } from 'src/app/services/activities.service';

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.scss']
})
export class JobListComponent implements OnInit {

  constructor(private activitiesService: ActivitiesService) { }

  jobs: LomJob[] = [];

  ngOnInit(): void {
    this.jobs = this.activitiesService.getAllJobs();
    this.activitiesService.startEventTimer();

  }

  incrementJob(job: LomJob) {
    this.activitiesService.incrementJob(job, 1);
  }

  getJobPercentComplete(job: LomJob): number {
    return job.currentXp;
  }

}
