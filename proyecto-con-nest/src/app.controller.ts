import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';


@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Get("/getall")
  getAll(): object {
   return this.appService.getAll()
  }
  @Get("/getbyid/:id")
  getAllById(@Param("id") id:string): object {
    console.log(id)
    return this.appService.getAllById(id)
  }

  @Post()
  save(@Body() prod: object): object {
    return this.appService.save(prod)
  }
}
