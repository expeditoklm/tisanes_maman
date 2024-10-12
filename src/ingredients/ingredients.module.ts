import { Module } from '@nestjs/common';
import { IngredientService } from './ingredients.service';
import { IngredientController } from './ingredients.controller';

@Module({
  providers: [IngredientService],
  controllers: [IngredientController]
})
export class IngredientsModule {}
