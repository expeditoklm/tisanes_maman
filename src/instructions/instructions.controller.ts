import { Controller, Get, Post, Body, Param, Patch, Delete, NotFoundException, BadRequestException } from '@nestjs/common';
import { CreateInstructionDto, UpdateInstructionDto } from './dto/instructions.dto';
import { InstructionService } from './instructions.service';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';


import { UseGuards } from '@nestjs/common';

import { AuthGuard } from '@nestjs/passport';
@UseGuards(AuthGuard('jwt'))
@ApiTags('Instructions')  // Tag pour regrouper ces endpoints dans Swagger
@Controller('instructions')
export class InstructionController {
  constructor(private readonly instructionService: InstructionService) {}

  @Post()
  @ApiOperation({ summary: 'Créer une nouvelle instruction' })
  @ApiBody({ type: CreateInstructionDto })  // Définit le schéma du corps
  @ApiResponse({ status: 201, description: 'Instruction créée avec succès.' })
  @ApiResponse({ status: 400, description: 'Erreur lors de la création de l\'instruction.' })
  async create(@Body() createInstructionDto: CreateInstructionDto) {
    try {
      return await this.instructionService.create(createInstructionDto);
    } catch (error) {
      throw new BadRequestException('Erreur lors de la création de l\'instruction.');
    }
  }

  @Get('remedy/:remedyId')
  @ApiOperation({ summary: 'Récupérer toutes les instructions d\'un remède par ID' })
  @ApiParam({ name: 'remedyId', description: 'L\'ID du remède pour lequel récupérer les instructions' })
  @ApiResponse({ status: 200, description: 'Instructions récupérées avec succès.' })
  @ApiResponse({ status: 404, description: 'Remède non trouvé.' })
  @ApiResponse({ status: 400, description: 'Erreur lors de la récupération des instructions.' })
  async findAll(@Param('remedyId') remedyId: string) {
    try {
      return await this.instructionService.findAll(remedyId);
    } catch (error) {
      throw new BadRequestException('Erreur lors de la récupération des instructions.');
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Récupérer une instruction par ID' })
  @ApiParam({ name: 'id', description: 'L\'ID de l\'instruction à récupérer' })
  @ApiResponse({ status: 200, description: 'Instruction récupérée avec succès.' })
  @ApiResponse({ status: 404, description: 'Instruction non trouvée.' })
  @ApiResponse({ status: 400, description: 'Erreur lors de la récupération de l\'instruction.' })
  async findOne(@Param('id') id: string) {
    try {
      return await this.instructionService.findOne(id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException('Instruction non trouvée.');
      }
      throw new BadRequestException('Erreur lors de la récupération de l\'instruction.');
    }
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Mettre à jour une instruction par ID' })
  @ApiParam({ name: 'id', description: 'L\'ID de l\'instruction à mettre à jour' })
  @ApiBody({ type: UpdateInstructionDto })  // Définit le schéma du corps pour la mise à jour
  @ApiResponse({ status: 200, description: 'Instruction mise à jour avec succès.' })
  @ApiResponse({ status: 404, description: 'Instruction non trouvée.' })
  @ApiResponse({ status: 400, description: 'Erreur lors de la mise à jour de l\'instruction.' })
  async update(
    @Param('id') id: string,
    @Body() updateInstructionDto: UpdateInstructionDto
  ) {
    try {
      return await this.instructionService.update(id, updateInstructionDto);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException('Instruction non trouvée.');
      }
      throw new BadRequestException('Erreur lors de la mise à jour de l\'instruction.');
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer une instruction par ID' })
  @ApiParam({ name: 'id', description: 'L\'ID de l\'instruction à supprimer' })
  @ApiResponse({ status: 200, description: 'Instruction supprimée avec succès.' })
  @ApiResponse({ status: 404, description: 'Instruction non trouvée.' })
  @ApiResponse({ status: 400, description: 'Erreur lors de la suppression de l\'instruction.' })
  async remove(@Param('id') id: string) {
    try {
      return await this.instructionService.remove(id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException('Instruction non trouvée.');
      }
      throw new BadRequestException('Erreur lors de la suppression de l\'instruction.');
    }
  }
}
