import { IsString, IsNotEmpty, IsOptional, IsBoolean } from 'class-validator';

export class CreateIngredientDto {
  @IsString()
  @IsNotEmpty({ message: 'Le nom de l\'ingrédient est obligatoire.' })
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString() 
  imgUrls?: string [];
}

export class UpdateIngredientDto {
  @IsString()
  @IsOptional()
  @IsNotEmpty({ message: 'Le nom de l\'ingrédient ne peut pas être vide.' })
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;

  
  @IsOptional()
  @IsString()
  imgUrls: string [];

  photoIdsToDelete?: string[]; // Ajout de cette ligne pour les IDs de photos à supprimer
}
