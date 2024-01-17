import {HttpClient} from "@angular/common/http";
import {BuildResponse, ProjectResponse, TemplateResponse} from "../models";
import { Injectable } from "@angular/core";
import { firstValueFrom } from "rxjs";
import environment from "../../environments/environment";
@Injectable({
  providedIn: "root",
})
export class AppService {
  public loader = {
    count: 0
  };
  private readonly backendUrl = environment.apiUrl;

  constructor(private readonly http: HttpClient) {}

  getProjects() {
    return this.http.get<ProjectResponse>(`${this.backendUrl}/projects`);
  }

  getTemplates() {
    return this.http.get<TemplateResponse>(`${this.backendUrl}/templates`);
  }

  async buildProject(id: number, templateId: number) {
    return firstValueFrom(
      this.http.post<BuildResponse>(`${this.backendUrl}/build`, {
        id,
        templateId
      }),
    );
  }
}
