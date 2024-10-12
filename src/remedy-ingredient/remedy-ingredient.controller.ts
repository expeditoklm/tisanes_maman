import { Controller, Get, Post, Body, Param, Patch, Delete, NotFoundException, BadRequestException } from '@nestjs/common';
import { RemedyIngredientService } from './remedy-ingredient.service';
import { CreateRemedyIngredientDto, UpdateRemedyIngredientDto } from './dto/remedy-ingredient.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';

import { UseGuards } from '@nestjs/common';

import { AuthGuard } from '@nestjs/passport';
@UseGuards(AuthGuard('jwt'))

@ApiTags('Remèdes - Ingrédients')  // Tag pour regrouper ces endpoints dans Swagger
@Controller('remedy-ingredients')
export class RemedyIngredientController {
  constructor(private readonly remedyIngredientService: RemedyIngredientService) {}

  @Post()
  @ApiOperation({ summary: 'Créer une nouvelle relation remède-ingrédient' })
  @ApiBody({ type: CreateRemedyIngredientDto })  // Définit le schéma du corps
  @ApiResponse({ status: 201, description: 'Relation créée avec succès.' })
  @ApiResponse({ status: 400, description: 'Erreur lors de la création de la relation remède-ingrédient.' })
  async create(@Body() createRemedyIngredientDto: CreateRemedyIngredientDto) {
    try {
      return await this.remedyIngredientService.create(createRemedyIngredientDto);
    } catch (error) {
      throw new BadRequestException('Erreur lors de la création de la relation remède-ingrédient.');
    }
  }

  @Get()
  @ApiOperation({ summary: 'Récupérer toutes les relations remède-ingrédient' })
  @ApiResponse({ status: 200, description: 'Relations récupérées avec succès.' })
  @ApiResponse({ status: 400, description: 'Erreur lors de la récupération des relations remède-ingrédient.' })
  async findAll() {
    try {
      return await this.remedyIngredientService.findAll();
    } catch (error) {
      throw new BadRequestException('Erreur lors de la récupération des relations remède-ingrédient.');
    }
  }

  @Get(':remedyId/:ingredientId')
  @ApiOperation({ summary: 'Récupérer une relation remède-ingrédient par ID' })
  @ApiParam({ name: 'remedyId', description: 'L\'ID du remède' })
  @ApiParam({ name: 'ingredientId', description: 'L\'ID de l\'ingrédient' })
  @ApiResponse({ status: 200, description: 'Relation récupérée avec succès.' })
  @ApiResponse({ status: 404, description: 'Relation non trouvée.' })
  @ApiResponse({ status: 400, description: 'Erreur lors de la récupération de la relation remède-ingrédient.' })
  async findOne(@Param('remedyId') remedyId: string, @Param('ingredientId') ingredientId: string) {
    try {
      return await this.remedyIngredientService.findOne(remedyId, ingredientId);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException('Relation non trouvée.');
      }
      throw new BadRequestException('Erreur lors de la récupération de la relation remède-ingrédient.');
    }
  }

  @Patch(':remedyId/:ingredientId')
  @ApiOperation({ summary: 'Mettre à jour une relation remède-ingrédient par ID' })
  @ApiParam({ name: 'remedyId', description: 'L\'ID du remède' })
  @ApiParam({ name: 'ingredientId', description: 'L\'ID de l\'ingrédient' })
  @ApiBody({ type: UpdateRemedyIngredientDto })  // Définit le schéma du corps pour la mise à jour
  @ApiResponse({ status: 200, description: 'Relation mise à jour avec succès.' })
  @ApiResponse({ status: 404, description: 'Relation non trouvée.' })
  @ApiResponse({ status: 400, description: 'Erreur lors de la mise à jour de la relation remède-ingrédient.' })
  async update(
    @Param('remedyId') remedyId: string,
    @Param('ingredientId') ingredientId: string,
    @Body() updateRemedyIngredientDto: UpdateRemedyIngredientDto
  ) {
    try {
      return await this.remedyIngredientService.update(remedyId, ingredientId, updateRemedyIngredientDto);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException('Relation non trouvée.');
      }
      throw new BadRequestException('Erreur lors de la mise à jour de la relation remède-ingrédient.');
    }
  }

  @Delete(':remedyId/:ingredientId')
  @ApiOperation({ summary: 'Supprimer une relation remède-ingrédient par ID' })
  @ApiParam({ name: 'remedyId', description: 'L\'ID du remède' })
  @ApiParam({ name: 'ingredientId', description: 'L\'ID de l\'ingrédient' })
  @ApiResponse({ status: 200, description: 'Relation supprimée avec succès.' })
  @ApiResponse({ status: 404, description: 'Relation non trouvée.' })
  @ApiResponse({ status: 400, description: 'Erreur lors de la suppression de la relation remède-ingrédient.' })
  async remove(@Param('remedyId') remedyId: string, @Param('ingredientId') ingredientId: string) {
    try {
      return await this.remedyIngredientService.remove(remedyId, ingredientId);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException('Relation non trouvée.');
      }
      throw new BadRequestException('Erreur lors de la suppression de la relation remède-ingrédient.');
    }
  }
}
