import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateRemedyIngredientDto, UpdateRemedyIngredientDto } from './dto/remedy-ingredient.dto';

@Injectable()
export class RemedyIngredientService {
  constructor(private prisma: PrismaService) {}

  // Créer une nouvelle relation entre un remède et un ingrédient
  async create(createRemedyIngredientDto: CreateRemedyIngredientDto) {
    const { remedyId, ingredientId, quantity } = createRemedyIngredientDto;

    // Vérification de l'existence du remède et de l'ingrédient
    const remedy = await this.prisma.remedy.findUnique({ where: { id: remedyId } });
    const ingredient = await this.prisma.ingredient.findUnique({ where: { id: ingredientId } });

    if (!remedy || remedy.deleted) {
      throw new NotFoundException('Le remède spécifié est introuvable ou a été supprimé.');
    }
    if (!ingredient || ingredient.deleted) {
      throw new NotFoundException('L\'ingrédient spécifié est introuvable ou a été supprimé.');
    }

    try {
      return await this.prisma.remedyIngredient.create({
        data: {
          remedyId,
          ingredientId,
          quantity,
        },
      });
    } catch (error) {
      throw new BadRequestException('Erreur lors de l\'ajout de l\'ingrédient au remède.');
    }
  }

  // Récupérer tous les remèdes avec leurs ingrédients
  async findAll() {
    try {
      return await this.prisma.remedyIngredient.findMany({
        where: { deleted: false },
        include: { remedy: true, ingredient: true },
      });
    } catch (error) {
      throw new BadRequestException('Erreur lors de la récupération des données.');
    }
  }

  // Récupérer un remède avec ses ingrédients par ID
  async findOne(remedyId: string, ingredientId: string) {
    const remedyIngredient = await this.prisma.remedyIngredient.findUnique({
      where: { remedyId_ingredientId: { remedyId, ingredientId } },
      include: { remedy: true, ingredient: true },
    });

    if (!remedyIngredient) {
      throw new NotFoundException('La relation remède-ingrédient spécifiée est introuvable.');
    }
    if (remedyIngredient.deleted) {
      throw new NotFoundException('Cette relation a été supprimée.');
    }

    return remedyIngredient;
  }

  // Mettre à jour une relation remède-ingrédient
  async update(remedyId: string, ingredientId: string, updateRemedyIngredientDto: UpdateRemedyIngredientDto) {
    const remedyIngredient = await this.prisma.remedyIngredient.findUnique({
      where: { remedyId_ingredientId: { remedyId, ingredientId } },
    });

    if (!remedyIngredient) {
      throw new NotFoundException('La relation remède-ingrédient spécifiée est introuvable.');
    }
    if (remedyIngredient.deleted) {
      throw new BadRequestException('Impossible de mettre à jour une relation supprimée.');
    }

    try {
      return await this.prisma.remedyIngredient.update({
        where: { remedyId_ingredientId: { remedyId, ingredientId } },
        data: updateRemedyIngredientDto,
      });
    } catch (error) {
      throw new BadRequestException('Erreur lors de la mise à jour de la relation.');
    }
  }

  // Supprimer (soft delete) une relation remède-ingrédient
  async remove(remedyId: string, ingredientId: string) {
    const remedyIngredient = await this.prisma.remedyIngredient.findUnique({
      where: { remedyId_ingredientId: { remedyId, ingredientId } },
    });

    if (!remedyIngredient) {
      throw new NotFoundException('La relation remède-ingrédient spécifiée est introuvable.');
    }
    if (remedyIngredient.deleted) {
      throw new BadRequestException('Cette relation est déjà supprimée.');
    }

    try {
      return await this.prisma.remedyIngredient.update({
        where: { remedyId_ingredientId: { remedyId, ingredientId } },
        data: { deleted: true },
      });
    } catch (error) {
      throw new BadRequestException('Erreur lors de la suppression de la relation.');
    }
  }
}
