import { Module } from '@nestjs/common';
import { RemedyDiseaseService } from './remedy-disease.service';
import { RemedyDiseaseController } from './remedy-disease.controller';

@Module({
  providers: [RemedyDiseaseService],
  controllers: [RemedyDiseaseController]
})
export class RemedyDiseaseModule {}
