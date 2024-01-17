import {Component, OnDestroy, OnInit} from "@angular/core";
import { Subscription, map, forkJoin } from "rxjs";
import { AppService } from "./services/app.service";
import {Project, Template} from "./models";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit, OnDestroy {
  private sub = new Subscription();
  protected projects: Project[] = [];
  protected templates: Template[] = [];
  protected loader: { count: number };
  constructor(private readonly appService: AppService) {
    this.loader = appService.loader;
  }

  ngOnInit() {
    this.sub.add(
      forkJoin({
        projectData: this.appService.getProjects(),
        templateData: this.appService.getTemplates()
      }).pipe(map(({projectData, templateData}) => ({
        projectData: projectData.projects,
        templateData: templateData.templates
      })))
        .subscribe(({projectData, templateData}) => {
          this.projects = projectData;
          this.templates = templateData;
        }),
    );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
