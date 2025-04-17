import { IsNotEmpty, IsString, IsOptional, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateIngredientDto } from 'src/ingredients/dto/ingredient.dto';
import { Instruction } from '@prisma/client';
import { CreateInstructionDto } from 'src/instructions/dto/instructions.dto';
export class CreateRemedyDto {
  @IsString()
  @IsNotEmpty({ message: 'Le nom du remède est requis.' })
  name: string;

  @IsNotEmpty({ message: 'La valeur du remède est requise.' })
  value: number;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  ingredientIds?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  diseaseIds?: string[]; // Corrigé pour être un tableau de string

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateIngredientDto)
  newIngredients?: CreateIngredientDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateInstructionDto)
  instructions?: CreateInstructionDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateInstructionDto)
  newInstructions?: CreateInstructionDto[];

}