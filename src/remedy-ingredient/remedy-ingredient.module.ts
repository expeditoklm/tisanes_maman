import { Module } from '@nestjs/common';
import { RemedyIngredientService } from './remedy-ingredient.service';
import { RemedyIngredientController } from './remedy-ingredient.controller';

@Module({
  providers: [RemedyIngredientService],
  controllers: [RemedyIngredientController]
})
export class RemedyIngredientModule {}
