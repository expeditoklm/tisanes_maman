import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RemediesModule } from './remedies/remedies.module';
import { IngredientsModule } from './ingredients/ingredients.module';
import { DiseasesModule } from './diseases/diseases.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { RemedyIngredientModule } from './remedy-ingredient/remedy-ingredient.module';
import { RemedyDiseaseModule } from './remedy-disease/remedy-disease.module';
import { InstructionService } from './instructions/instructions.service';
import { InstructionsModule } from './instructions/instructions.module';
import { AuthModule } from './auth/auth.module';
import { CategoriesModule } from './categories/categories.module';
@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }),RemediesModule, IngredientsModule, DiseasesModule, PrismaModule, RemedyIngredientModule, RemedyDiseaseModule, InstructionsModule, AuthModule, CategoriesModule],
  controllers: [AppController],
  providers: [AppService, InstructionService],
})
export class AppModule {}
