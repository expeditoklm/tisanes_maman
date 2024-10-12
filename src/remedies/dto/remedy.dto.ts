import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class CreateRemedyDto {
  @IsString()
  @IsNotEmpty({ message: 'Le nom du remède est requis.' })
  name: string;

  @IsOptional()
  @IsString()
  description?: string;
}

export class UpdateRemedyDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty({ message: 'Le nom du remède ne peut pas être vide.' })
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;
}

