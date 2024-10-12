import { Module } from '@nestjs/common';
import { RemedyService } from './remedies.service';
import { RemedyController } from './remedies.controller';


@Module({
  providers: [RemedyService],
  controllers: [RemedyController]
})
export class RemediesModule {}
