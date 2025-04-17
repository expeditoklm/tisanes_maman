import { Module } from '@nestjs/common';
import { RemedyService } from './remedies.service';
import { RemedyController } from './remedies.controller';
import { IngredientService } from 'src/ingredients/ingredients.service';


@Module({
  providers: [RemedyService,IngredientService],
  controllers: [RemedyController]
})
export class RemediesModule {}
