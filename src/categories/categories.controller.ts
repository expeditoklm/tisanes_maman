import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, BadRequestException, UseGuards, Put } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { CategoryService } from 'src/categories/categories.service';
import { CreateCategoryDto, UpdateCategoryDto } from 'src/categories/dto/categories.dto';

@UseGuards(AuthGuard('jwt'))
@ApiTags('Catégories')  // Tag pour regrouper ces endpoints dans Swagger
@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @ApiOperation({ summary: 'Créer une nouvelle catégorie' })
  @ApiBody({ type: CreateCategoryDto })  // Définit le schéma du corps
  @ApiResponse({ status: 201, description: 'Catégorie créée avec succès.' })
  @ApiResponse({ status: 400, description: 'Erreur lors de la création de la catégorie.' })
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    try {
      return await this.categoryService.create(createCategoryDto);
    } catch (error) {
      throw new BadRequestException('Erreur lors de la création de la catégorie.');
    }
  }

  @Get()
  @ApiOperation({ summary: 'Récupérer toutes les catégories' })
  @ApiResponse({ status: 200, description: 'Liste des catégories récupérée avec succès.' })
  @ApiResponse({ status: 400, description: 'Erreur lors de la récupération des catégories.' })
  async findAll() {
      return await this.categoryService.findAll();

  }

  @Get(':id')
  @ApiOperation({ summary: 'Récupérer une catégorie par ID' })
  @ApiParam({ name: 'id', description: 'L\'ID de la catégorie à récupérer' })
  @ApiResponse({ status: 200, description: 'Catégorie récupérée avec succès.' })
  @ApiResponse({ status: 404, description: 'Catégorie non trouvée.' })
  @ApiResponse({ status: 400, description: 'Erreur lors de la récupération de la catégorie.' })
  async findOne(@Param('id') id: string) {
 
      return await this.categoryService.findOne(id);
  
  }

  @Put(':id')
  @ApiOperation({ summary: 'Mettre à jour une catégorie par ID' })
  @ApiParam({ name: 'id', description: 'L\'ID de la catégorie à mettre à jour' })
  @ApiBody({ type: UpdateCategoryDto })
  @ApiResponse({ status: 200, description: 'Catégorie mise à jour avec succès.' })
  @ApiResponse({ status: 404, description: 'Catégorie non trouvée.' })
  @ApiResponse({ status: 400, description: 'Erreur lors de la mise à jour de la catégorie.' })
  async update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
      return await this.categoryService.update(id, updateCategoryDto);
  
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer une catégorie par ID' })
  @ApiParam({ name: 'id', description: 'L\'ID de la catégorie à supprimer' })
  @ApiResponse({ status: 200, description: 'Catégorie supprimée avec succès.' })
  @ApiResponse({ status: 404, description: 'Catégorie non trouvée.' })
  @ApiResponse({ status: 400, description: 'Erreur lors de la suppression de la catégorie.' })
  async remove(@Param('id') id: string) {
      return await this.categoryService.remove(id);
    
  }
}