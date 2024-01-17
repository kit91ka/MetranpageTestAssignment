import { Injectable } from "@nestjs/common";
import { ProjectsRepository } from "./data/projects.repository";
import { TemplatesRepository } from "./data/templates.repository";
import { firstValueFrom } from "rxjs";
import { HttpService } from "@nestjs/axios";

type WorkerResponse = {
  success: boolean;
  error?: string;
  buildedProject?: string;
};

@Injectable()
export class AppService {
  private readonly workerUrl: string;

  constructor(
    private readonly projectsRepository: ProjectsRepository,
    private readonly templatesRepository: TemplatesRepository,
    private readonly httpService: HttpService,
  ) {
    this.workerUrl = process.env.WORKER_URL;
  }

  getProjects() {
    return {
      projects: this.projectsRepository.getList(),
    };
  }

  getTemplates() {
    return {
      templates: this.templatesRepository.getList(),
    };
  }

  async buildProject(id: number, templateId: number) {
    // TODO actually, there should be queue scheduling, at actual project RabbitMQ is used
    const template = this.templatesRepository.getList().find(template => template.id === templateId);
    if (!template) {
      throw new Error("Invalid templateId");
    }
    // I could just add here this Template args: arg1 = arg1-1, arg2 = arg1-2 after the answer but it seems
    // a bad idea to me so I made this in AppController.cs
    const response = await this.makeRequest(`${this.workerUrl}/build`, { id, template });

    if (response) {
      const processedData = response.buildedProject!;
      return {
        buildedProject: `Additionally proccessed data from worker: ${processedData}`,
      }
    } else {
      throw new Error("Something went wrong");
    }
  }

  async makeRequest(url: string, body?: object): Promise<WorkerResponse | false> {
    if (!url) {
      throw new Error("No url");
    }
    return firstValueFrom(
      this.httpService.post(url, {
        ...body,
      }),
    )
      .then((response) => {
        if (response.data.success && response.data.success === true) {
          return response.data;
        }
        console.error(`Request is ok, but service returned an error ${url}:`);
        console.error(response);
        return false;
      })
      .catch((error) => {
        console.error(`Cannot make request ${url}:`);
        console.error(error);

        return false;
      });
  }
}
