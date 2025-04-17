import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, BadRequestException, UseGuards, Put } from '@nestjs/common';
import { DiseaseService } from './diseases.service';
import { CreateDiseaseDto, UpdateDiseaseDto } from './dto/diseases.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
@UseGuards(AuthGuard('jwt'))
@ApiTags('Maladies')  // Tag pour regrouper ces endpoints dans Swagger
@Controller('diseases')
export class DiseaseController {
  constructor(private readonly diseaseService: DiseaseService) {}

  @Post()
  @ApiOperation({ summary: 'Créer une nouvelle maladie' })
  @ApiBody({ type: CreateDiseaseDto })  // Définit le schéma du corps
  @ApiResponse({ status: 201, description: 'Maladie créée avec succès.' })
  @ApiResponse({ status: 400, description: 'Erreur lors de la création de la maladie.' })
  async create(@Body() createDiseaseDto: CreateDiseaseDto) {
    try {
      return await this.diseaseService.create(createDiseaseDto);
    } catch (error) {
      throw new BadRequestException('Erreur lors de la création de la maladie.');
    }
  }


  @Get()
  @ApiOperation({ summary: 'Récupérer toutes les maladies' })
  @ApiResponse({ status: 200, description: 'Liste des maladies récupérée avec succès.' })
  @ApiResponse({ status: 400, description: 'Erreur lors de la récupération des maladies.' })
  async findAll() {
    try {
      return await this.diseaseService.findAll();
    } catch (error) {
      throw new BadRequestException('Erreur lors de la récupération des maladies.');
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Récupérer une maladie par ID' })
  @ApiParam({ name: 'id', description: 'L\'ID de la maladie à récupérer' })  // Définit le paramètre dans Swagger
  @ApiResponse({ status: 200, description: 'Maladie récupérée avec succès.' })
  @ApiResponse({ status: 404, description: 'Maladie non trouvée.' })
  @ApiResponse({ status: 400, description: 'Erreur lors de la récupération de la maladie.' })
  async findOne(@Param('id') id: string) {
    try {
      return await this.diseaseService.findOne(id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw new BadRequestException('Erreur lors de la récupération de la maladie.');
    }
  }

  @Put(':id')
  @ApiOperation({ summary: 'Mettre à jour une maladie par ID' })
  @ApiParam({ name: 'id', description: 'L\'ID de la maladie à mettre à jour' })
  @ApiBody({ type: UpdateDiseaseDto })  // Définit le schéma du corps pour la mise à jour
  @ApiResponse({ status: 200, description: 'Maladie mise à jour avec succès.' })
  @ApiResponse({ status: 404, description: 'Maladie non trouvée.' })
  @ApiResponse({ status: 400, description: 'Erreur lors de la mise à jour de la maladie.' })
  async update(@Param('id') id: string, @Body() updateDiseaseDto: UpdateDiseaseDto) {
    try {
      return await this.diseaseService.update(id, updateDiseaseDto);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw new BadRequestException('Erreur lors de la mise à jour de la maladie.');
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer une maladie par ID' })
  @ApiParam({ name: 'id', description: 'L\'ID de la maladie à supprimer' })
  @ApiResponse({ status: 200, description: 'Maladie supprimée avec succès.' })
  @ApiResponse({ status: 404, description: 'Maladie non trouvée.' })
  @ApiResponse({ status: 400, description: 'Erreur lors de la suppression de la maladie.' })
  async remove(@Param('id') id: string) {
    try {
      return await this.diseaseService.remove(id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw new BadRequestException('Erreur lors de la suppression de la maladie.');
    }
  }
}
