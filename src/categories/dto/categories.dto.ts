// src/category/dto/category.dto.ts
import { IsNotEmpty, IsString, IsOptional, IsBoolean } from 'class-validator';

export class CreateCategoryDto {
  @IsNotEmpty({ message: 'Le nom de la catégorie est requis' })
  @IsString({ message: 'Le nom doit être une chaîne de caractères' })
  name: string;
}

export class UpdateCategoryDto {
  @IsOptional()
  @IsString({ message: 'Le nom doit être une chaîne de caractères' })
  name?: string;

  @IsOptional()
  @IsBoolean({ message: 'La valeur supprimée doit être un booléen' })
  deleted?: boolean;
}