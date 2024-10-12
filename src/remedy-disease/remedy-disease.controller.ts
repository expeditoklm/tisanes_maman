import { Controller, Get, Post, Body, Param, Patch, Delete, NotFoundException, BadRequestException } from '@nestjs/common';
import { RemedyDiseaseService } from './remedy-disease.service';
import { CreateRemedyDiseaseDto, UpdateRemedyDiseaseDto } from './dto/remedy-disease.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';


import { UseGuards } from '@nestjs/common';

import { AuthGuard } from '@nestjs/passport';
@UseGuards(AuthGuard('jwt'))
@ApiTags('Remèdes - Maladies')  // Tag pour regrouper ces endpoints dans Swagger
@Controller('remedy-diseases')
export class RemedyDiseaseController {
  constructor(private readonly remedyDiseaseService: RemedyDiseaseService) {}

  @Post()
  @ApiOperation({ summary: 'Créer une nouvelle association remède-maladie' })
  @ApiBody({ type: CreateRemedyDiseaseDto })  // Définit le schéma du corps
  @ApiResponse({ status: 201, description: 'Association créée avec succès.' })
  @ApiResponse({ status: 400, description: 'Erreur lors de la création de l\'association.' })
  async create(@Body() createRemedyDiseaseDto: CreateRemedyDiseaseDto) {
    try {
      return await this.remedyDiseaseService.create(createRemedyDiseaseDto);
    } catch (error) {
      throw new BadRequestException('Erreur lors de la création de l\'association.');
    }
  }

  @Get()
  @ApiOperation({ summary: 'Récupérer toutes les associations remède-maladie' })
  @ApiResponse({ status: 200, description: 'Associations récupérées avec succès.' })
  @ApiResponse({ status: 400, description: 'Erreur lors de la récupération des associations.' })
  async findAll() {
    try {
      return await this.remedyDiseaseService.findAll();
    } catch (error) {
      throw new BadRequestException('Erreur lors de la récupération des associations.');
    }
  }

  @Get(':remedyId/:diseaseId')
  @ApiOperation({ summary: 'Récupérer une association remède-maladie par ID' })
  @ApiParam({ name: 'remedyId', description: 'L\'ID du remède' })
  @ApiParam({ name: 'diseaseId', description: 'L\'ID de la maladie' })
  @ApiResponse({ status: 200, description: 'Association récupérée avec succès.' })
  @ApiResponse({ status: 404, description: 'Association non trouvée.' })
  @ApiResponse({ status: 400, description: 'Erreur lors de la récupération de l\'association.' })
  async findOne(
    @Param('remedyId') remedyId: string,
    @Param('diseaseId') diseaseId: string
  ) {
    try {
      return await this.remedyDiseaseService.findOne(remedyId, diseaseId);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException('Association non trouvée.');
      }
      throw new BadRequestException('Erreur lors de la récupération de l\'association.');
    }
  }

  @Patch(':remedyId/:diseaseId')
  @ApiOperation({ summary: 'Mettre à jour une association remède-maladie par ID' })
  @ApiParam({ name: 'remedyId', description: 'L\'ID du remède' })
  @ApiParam({ name: 'diseaseId', description: 'L\'ID de la maladie' })
  @ApiBody({ type: UpdateRemedyDiseaseDto })  // Définit le schéma du corps pour la mise à jour
  @ApiResponse({ status: 200, description: 'Association mise à jour avec succès.' })
  @ApiResponse({ status: 404, description: 'Association non trouvée.' })
  @ApiResponse({ status: 400, description: 'Erreur lors de la mise à jour de l\'association.' })
  async update(
    @Param('remedyId') remedyId: string,
    @Param('diseaseId') diseaseId: string,
    @Body() updateRemedyDiseaseDto: UpdateRemedyDiseaseDto
  ) {
    try {
      return await this.remedyDiseaseService.update(remedyId, diseaseId, updateRemedyDiseaseDto);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException('Association non trouvée.');
      }
      throw new BadRequestException('Erreur lors de la mise à jour de l\'association.');
    }
  }

  @Delete(':remedyId/:diseaseId')
  @ApiOperation({ summary: 'Supprimer une association remède-maladie par ID' })
  @ApiParam({ name: 'remedyId', description: 'L\'ID du remède' })
  @ApiParam({ name: 'diseaseId', description: 'L\'ID de la maladie' })
  @ApiResponse({ status: 200, description: 'Association supprimée avec succès.' })
  @ApiResponse({ status: 404, description: 'Association non trouvée.' })
  @ApiResponse({ status: 400, description: 'Erreur lors de la suppression de l\'association.' })
  async remove(
    @Param('remedyId') remedyId: string,
    @Param('diseaseId') diseaseId: string
  ) {
    try {
      return await this.remedyDiseaseService.remove(remedyId, diseaseId);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException('Association non trouvée.');
      }
      throw new BadRequestException('Erreur lors de la suppression de l\'association.');
    }
  }
}
