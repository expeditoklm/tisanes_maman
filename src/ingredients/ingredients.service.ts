import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateIngredientDto, UpdateIngredientDto } from './dto/ingredient.dto';

@Injectable()
export class IngredientService {
  constructor(private prisma: PrismaService) {}

  async create(createIngredientDto: CreateIngredientDto) {
    const { name } = createIngredientDto;

    // Check if ingredient already exists (soft-deleted included)
    const existingIngredient = await this.prisma.ingredient.findFirst({
      where: { name },
    });

    if (existingIngredient) {
      throw new BadRequestException('Cet ingrédient existe déjà dans la base de données.');
    }

    try {
      return await this.prisma.ingredient.create({
        data: {
          name,
        },
      });
    } catch (error) {
      throw new BadRequestException('Erreur lors de la création de l\'ingrédient.');
    }
  }

  async findAll() {
    try {
      return await this.prisma.ingredient.findMany({
        where: { deleted: false },
      });
    } catch (error) {
      throw new BadRequestException('Erreur lors de la récupération des ingrédients.');
    }
  }

  async findOne(id: string) {
    const ingredient = await this.prisma.ingredient.findUnique({
      where: { id },
    });

    if (!ingredient) {
      throw new NotFoundException('L\'ingrédient demandé n\'existe pas.');
    }

    if (ingredient.deleted) {
      throw new NotFoundException('L\'ingrédient a été supprimé.');
    }

    return ingredient;
  }

  async update(id: string, updateIngredientDto: UpdateIngredientDto) {
    const ingredient = await this.prisma.ingredient.findUnique({
      where: { id },
    });

    if (!ingredient) {
      throw new NotFoundException('L\'ingrédient demandé n\'existe pas.');
    }

    if (ingredient.deleted) {
      throw new BadRequestException('Impossible de mettre à jour un ingrédient supprimé.');
    }

    try {
      return await this.prisma.ingredient.update({
        where: { id },
        data: updateIngredientDto,
      });
    } catch (error) {
      throw new BadRequestException('Erreur lors de la mise à jour de l\'ingrédient.');
    }
  }

  async remove(id: string) {
    const ingredient = await this.prisma.ingredient.findUnique({
      where: { id },
    });

    if (!ingredient) {
      throw new NotFoundException('L\'ingrédient demandé n\'existe pas.');
    }

    if (ingredient.deleted) {
      throw new BadRequestException('Cet ingrédient est déjà supprimé.');
    }

    try {
      return await this.prisma.ingredient.update({
        where: { id },
        data: { deleted: true },
      });
    } catch (error) {
      throw new BadRequestException('Erreur lors de la suppression de l\'ingrédient.');
    }
  }
}
