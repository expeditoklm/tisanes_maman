import { IsUUID, IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateRemedyIngredientDto {
  @IsUUID('4', { message: 'L\'ID du remède fourni est invalide.' })
  @IsNotEmpty({ message: 'L\'ID du remède est obligatoire.' })
  remedyId: string;

  @IsUUID('4', { message: 'L\'ID de l\'ingrédient fourni est invalide.' })
  @IsNotEmpty({ message: 'L\'ID de l\'ingrédient est obligatoire.' })
  ingredientId: string;

  @IsString()
  @IsOptional({ message: 'La quantité est obligatoire.' })
  quantity: string;

  @IsString()
  @IsOptional({ message: 'L\'unité est obligatoire.' })
  unit: string;
}

export class UpdateRemedyIngredientDto {
  @IsString()
  @IsOptional()
  quantity?: string;

  @IsString()
  @IsOptional()
  unit?: string;

  @IsOptional()
  deleted?: boolean;
}
