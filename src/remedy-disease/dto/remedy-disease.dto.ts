import { IsString, IsNotEmpty, IsOptional, IsUUID, IsBoolean } from 'class-validator';

export class CreateRemedyDiseaseDto {
  @IsUUID()
  @IsNotEmpty({ message: 'L\'ID du remède est requis.' })
  remedyId: string;

  @IsUUID()
  @IsNotEmpty({ message: 'L\'ID de la maladie est requis.' })
  diseaseId: string;

  @IsOptional()
  @IsBoolean({ message: 'La valeur de suppression doit être un booléen.' })
  deleted?: boolean;
}

export class UpdateRemedyDiseaseDto {
  @IsOptional()
  @IsUUID()
  remedyId?: string;

  @IsOptional()
  @IsUUID()
  diseaseId?: string;

  @IsOptional()
  @IsBoolean({ message: 'La valeur de suppression doit être un booléen.' })
  deleted?: boolean;
}
