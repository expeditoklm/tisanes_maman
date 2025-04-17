import { IsString, IsNotEmpty, IsOptional, IsBoolean, IsUUID } from 'class-validator';

export class CreateDiseaseDto {
  @IsString()
  @IsNotEmpty({ message: 'Le nom de la maladie est requis.' })
  name: string;

  @IsNotEmpty({ message: 'L\'ID de la categorie est requis.' })
    @IsUUID('4', { message: 'L\'ID  de la categorie  doit être un UUID valide.' })
    categoryId: string;

  @IsOptional()
  @IsString()
  description: string;

}

export class UpdateDiseaseDto {
  @IsString()
  @IsOptional()
  name?: string;

  
  @IsNotEmpty({ message: 'L\'ID de la categorie est requis.' })
    @IsUUID('4', { message: 'L\'ID  de la categorie  doit être un UUID valide.' })
    categoryId: string;

  @IsOptional()
  @IsString()
  description?: string;

  
}
