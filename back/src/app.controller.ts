import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { AppService } from "./app.service";

type BuildRequest = {
  id: number;
  templateId: number;
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("projects")
  getProjects() {
    return this.appService.getProjects();
  }

  @Get("templates")
  getTemplates() {
    return this.appService.getTemplates();
  }

  @Post("build")
  buildProject(@Body() request: BuildRequest) {
    return this.appService.buildProject(request.id, request.templateId);
  }
}
