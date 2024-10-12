import { IsString, IsNotEmpty, IsOptional, IsBoolean } from 'class-validator';

export class CreateIngredientDto {
  @IsString()
  @IsNotEmpty({ message: 'Le nom de l\'ingrédient est obligatoire.' })
  name: string;
}

export class UpdateIngredientDto {
  @IsString()
  @IsOptional()
  @IsNotEmpty({ message: 'Le nom de l\'ingrédient ne peut pas être vide.' })
  name?: string;

  @IsBoolean()
  @IsOptional()
  deleted?: boolean;
}
