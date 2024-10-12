import { Module } from '@nestjs/common';
import { DiseaseService } from './diseases.service';
import { DiseaseController } from './diseases.controller';

@Module({
  providers: [DiseaseService],
  controllers: [DiseaseController]
})
export class DiseasesModule {}
