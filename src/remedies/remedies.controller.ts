import { Controller, Get, Post, Body, Param, Patch, Delete, NotFoundException, BadRequestException } from '@nestjs/common';
import { RemedyService } from './remedies.service';
import { CreateRemedyDto, UpdateRemedyDto } from './dto/remedy.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';

import { UseGuards } from '@nestjs/common';

import { AuthGuard } from '@nestjs/passport';
@UseGuards(AuthGuard('jwt'))

@ApiTags('Remèdes')  // Tag pour regrouper ces endpoints dans Swagger
@Controller('remedies')
export class RemedyController {
  constructor(private readonly remedyService: RemedyService) {}

  @Post()
  @ApiOperation({ summary: 'Créer un nouveau remède' })
  @ApiBody({ type: CreateRemedyDto })  // Définit le schéma du corps
  @ApiResponse({ status: 201, description: 'Remède créé avec succès.' })
  @ApiResponse({ status: 400, description: 'Erreur lors de la création du remède.' })
  async create(@Body() createRemedyDto: CreateRemedyDto) {
    try {
      return await this.remedyService.create(createRemedyDto);
    } catch (error) {
      throw new BadRequestException('Erreur lors de la création du remède.');
    }
  }

  @Get()
  @ApiOperation({ summary: 'Récupérer tous les remèdes' })
  @ApiResponse({ status: 200, description: 'Remèdes récupérés avec succès.' })
  @ApiResponse({ status: 400, description: 'Erreur lors de la récupération des remèdes.' })
  async findAll() {
    try {
      return await this.remedyService.findAll();
    } catch (error) {
      throw new BadRequestException('Erreur lors de la récupération des remèdes.');
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Récupérer un remède par ID' })
  @ApiParam({ name: 'id', description: 'L\'ID du remède à récupérer' })
  @ApiResponse({ status: 200, description: 'Remède récupéré avec succès.' })
  @ApiResponse({ status: 404, description: 'Remède non trouvé.' })
  @ApiResponse({ status: 400, description: 'Erreur lors de la récupération du remède.' })
  async findOne(@Param('id') id: string) {
    try {
      return await this.remedyService.findOne(id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException('Remède non trouvé.');
      }
      throw new BadRequestException('Erreur lors de la récupération du remède.');
    }
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Mettre à jour un remède par ID' })
  @ApiParam({ name: 'id', description: 'L\'ID du remède à mettre à jour' })
  @ApiBody({ type: UpdateRemedyDto })  // Définit le schéma du corps pour la mise à jour
  @ApiResponse({ status: 200, description: 'Remède mis à jour avec succès.' })
  @ApiResponse({ status: 404, description: 'Remède non trouvé.' })
  @ApiResponse({ status: 400, description: 'Erreur lors de la mise à jour du remède.' })
  async update(@Param('id') id: string, @Body() updateRemedyDto: UpdateRemedyDto) {
    try {
      return await this.remedyService.update(id, updateRemedyDto);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException('Remède non trouvé.');
      }
      throw new BadRequestException('Erreur lors de la mise à jour du remède.');
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer un remède par ID' })
  @ApiParam({ name: 'id', description: 'L\'ID du remède à supprimer' })
  @ApiResponse({ status: 200, description: 'Remède supprimé avec succès.' })
  @ApiResponse({ status: 404, description: 'Remède non trouvé.' })
  @ApiResponse({ status: 400, description: 'Erreur lors de la suppression du remède.' })
  async delete(@Param('id') id: string) {
    try {
      return await this.remedyService.delete(id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException('Remède non trouvé.');
      }
      throw new BadRequestException('Erreur lors de la suppression du remède.');
    }
  }
}
