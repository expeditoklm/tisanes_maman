import { IsNotEmpty,IsOptional, IsString, IsUUID, IsInt, Min } from 'class-validator';

export class CreateInstructionDto {
  @IsNotEmpty({ message: 'Le numéro de l\'étape est requis.' })
  @IsInt({ message: 'Le numéro de l\'étape doit être un nombre entier.' })
  @Min(1, { message: 'Le numéro de l\'étape doit être au moins 1.' })
  stepNumber: number;

  @IsNotEmpty({ message: 'Le texte de l\'instruction est requis.' })
  @IsString({ message: 'Le texte de l\'instruction doit être une chaîne de caractères.' })
  text: string;

  @IsNotEmpty({ message: 'L\'ID du remède est requis.' })
  @IsUUID('4', { message: 'L\'ID du remède doit être un UUID valide.' })
  remedyId: string;
}




export class UpdateInstructionDto {
  @IsOptional()
  @IsInt({ message: 'Le numéro de l\'étape doit être un nombre entier.' })
  @Min(1, { message: 'Le numéro de l\'étape doit être au moins 1.' })
  stepNumber?: number;

  @IsOptional()
  @IsString({ message: 'Le texte de l\'instruction doit être une chaîne de caractères.' })
  text?: string;

  @IsOptional()
  @IsUUID('4', { message: 'L\'ID du remède doit être un UUID valide.' })
  remedyId?: string;
}
