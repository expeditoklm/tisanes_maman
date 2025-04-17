import { Controller, Get, Post, Body, Param, Patch, Delete, NotFoundException, BadRequestException, Put } from '@nestjs/common';
import { IngredientService } from './ingredients.service';
import { CreateIngredientDto, UpdateIngredientDto } from './dto/ingredient.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';

import { UseGuards } from '@nestjs/common';

import { AuthGuard } from '@nestjs/passport';
@UseGuards(AuthGuard('jwt'))
@ApiTags('Ingrédients')  // Tag pour regrouper ces endpoints dans Swagger
@Controller('ingredients')
export class IngredientController {
  constructor(private readonly ingredientService: IngredientService) {}

  @Post()
  @ApiOperation({ summary: 'Créer un nouvel ingrédient' })
  @ApiBody({ type: CreateIngredientDto })  // Définit le schéma du corps
  @ApiResponse({ status: 201, description: 'Ingrédient créé avec succès.' })
  @ApiResponse({ status: 400, description: 'Erreur lors de la création de l\'ingrédient.' })
  async create(@Body() createIngredientDto: CreateIngredientDto) {
    try {
      return await this.ingredientService.create(createIngredientDto);
    } catch (error) {
      throw new BadRequestException('Erreur lors de la création de l\'ingrédient.');
    }
  }

  @Get()
  @ApiOperation({ summary: 'Récupérer tous les ingrédients' })
  @ApiResponse({ status: 200, description: 'Liste des ingrédients récupérée avec succès.' })
  @ApiResponse({ status: 400, description: 'Erreur lors de la récupération des ingrédients.' })
  async findAll() {
    try {
      return await this.ingredientService.findAll();
    } catch (error) {
      throw new BadRequestException('Erreur lors de la récupération des ingrédients.');
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Récupérer un ingrédient par ID' })
  @ApiParam({ name: 'id', description: 'L\'ID de l\'ingrédient à récupérer' })  // Définit le paramètre dans Swagger
  @ApiResponse({ status: 200, description: 'Ingrédient récupéré avec succès.' })
  @ApiResponse({ status: 404, description: 'Ingrédient non trouvé.' })
  @ApiResponse({ status: 400, description: 'Erreur lors de la récupération de l\'ingrédient.' })
  async findOne(@Param('id') id: string) {
    try {
      return await this.ingredientService.findOne(id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException('Ingrédient non trouvé.');
      }
      throw new BadRequestException('Erreur lors de la récupération de l\'ingrédient.');
    }
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Mettre à jour un ingrédient par ID' })
  @ApiParam({ name: 'id', description: 'L\'ID de l\'ingrédient à mettre à jour' })
  @ApiBody({ type: UpdateIngredientDto })  // Définit le schéma du corps pour la mise à jour
  @ApiResponse({ status: 200, description: 'Ingrédient mis à jour avec succès.' })
  @ApiResponse({ status: 404, description: 'Ingrédient non trouvé.' })
  @ApiResponse({ status: 400, description: 'Erreur lors de la mise à jour de l\'ingrédient.' })
  async update(@Param('id') id: string, @Body() updateIngredientDto: UpdateIngredientDto) {
    try {
      return await this.ingredientService.update(id, updateIngredientDto);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException('Ingrédient non trouvé.');
      }
      throw new BadRequestException('Erreur lors de la mise à jour de l\'ingrédient.');
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer un ingrédient par ID' })
  @ApiParam({ name: 'id', description: 'L\'ID de l\'ingrédient à supprimer' })
  @ApiResponse({ status: 200, description: 'Ingrédient supprimé avec succès.' })
  @ApiResponse({ status: 404, description: 'Ingrédient non trouvé.' })
  @ApiResponse({ status: 400, description: 'Erreur lors de la suppression de l\'ingrédient.' })
  async remove(@Param('id') id: string) {
    try {
      return await this.ingredientService.remove(id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException('Ingrédient non trouvé.');
      }
      throw new BadRequestException('Erreur lors de la suppression de l\'ingrédient.');
    }
  }
}
