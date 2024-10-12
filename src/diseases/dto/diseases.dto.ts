import { IsString, IsNotEmpty, IsOptional, IsBoolean } from 'class-validator';

export class CreateDiseaseDto {
  @IsString()
  @IsNotEmpty({ message: 'Le nom de la maladie est requis.' })
  name: string;

  @IsOptional()
  @IsBoolean({ message: 'La valeur du statut supprimé doit être un booléen.' })
  deleted?: boolean;
}

export class UpdateDiseaseDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsOptional()
  @IsBoolean({ message: 'La valeur du statut supprimé doit être un booléen.' })
  deleted?: boolean;
}
