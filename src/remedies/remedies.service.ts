import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateRemedyDto } from './dto/remedy.dto';
import { CreateIngredientDto } from '../ingredients/dto/ingredient.dto';
import { IngredientService } from 'src/ingredients/ingredients.service';
import { Prisma, PrismaClient } from '@prisma/client';
import { 
  ConflictException, 
  InternalServerErrorException 
} from '@nestjs/common';

@Injectable()
export class RemedyService {
  constructor(private prisma: PrismaService,private ingredientService:IngredientService) {}

// Créer un nouveau remède
async create(createRemedyDto: CreateRemedyDto) {
  const { name, description, value, ingredientIds, newIngredients, instructions, diseaseIds } = createRemedyDto;

  // Utiliser une transaction Prisma pour garantir l'atomicité
  return this.prisma.$transaction(async (prisma) => {
    try {
      // Validation des champs requis
      if (!name) {
        throw new BadRequestException('Name is required');
      }

      // Création du remède de base
      const remedy = await prisma.remedy.create({
        data: {
          name,
          description,
          value,
        },
      });

      // Gérer les ingrédients existants
      if (ingredientIds && ingredientIds.length > 0) {
        const ingredientRelations = ingredientIds.map(ingredientId => ({
          remedyId: remedy.id,
          ingredientId,
        }));

        await prisma.remedyIngredient.createMany({
          data: ingredientRelations,
        });
      }

      // Créer et associer de nouveaux ingrédients
      if (newIngredients && newIngredients.length > 0) {
        for (const newIngredient of newIngredients) {
          // Utiliser le service d'ingrédients avec la transaction
          const ingredient = await this.ingredientService.create(newIngredient, prisma);
          
          await prisma.remedyIngredient.create({
            data: {
              remedyId: remedy.id,
              ingredientId: ingredient.id,
            },
          });
        }
      }

      // Créer les instructions
      if (instructions && instructions.length > 0) {
        const instructionsData = instructions.map((instruction, index) => ({
          stepNumber: index + 1,
          text: instruction.text,
          remedyId: remedy.id,
        }));

        await prisma.instruction.createMany({
          data: instructionsData,
        });
      }

      // Associer le remède aux maladies (au pluriel)
      if (diseaseIds && diseaseIds.length > 0) {
        const diseaseRelations = diseaseIds.map(diseaseId => ({
          diseaseId,
          remedyId: remedy.id,
        }));

        await prisma.remedyDisease.createMany({
          data: diseaseRelations,
        });
      }
      // Récupérer et retourner le remède avec toutes ses relations
      return prisma.remedy.findUnique({
        where: { id: remedy.id },
        include: {
          instructions: {
            orderBy: { stepNumber: 'asc' }
          },
          ingredients: {
            include: { ingredient: true }
          },
          diseases: {
            include: { disease: true }
          }
        }
      });
    } catch (error) {
      // La transaction va automatiquement annuler tous les changements en cas d'erreur

      // Gestion des erreurs spécifiques
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ConflictException('Un remède avec ce nom existe déjà');
        }
        if (error.code === 'P2003') {
          throw new BadRequestException('Contrainte de clé étrangère invalide');
        }
      }

      // Pour les autres types d'erreurs
      if (error instanceof BadRequestException) {
        throw error;
      }

      // Erreur générique pour les problèmes inattendus
      throw new InternalServerErrorException('Impossible de créer le remède. Veuillez réessayer.');
    }
  }, {
    // Options de transaction
    maxWait: 5000, // Temps d'attente maximum pour la transaction
    timeout: 10000 // Délai total maximum pour la transaction
  });
}

  // Récupérer tous les remèdes
  async findAll() {
    try {
      return await this.prisma.remedy.findMany({
        where: { deleted: false },
        include: {
          instructions: {
            orderBy: { stepNumber: 'asc' }
          },
          ingredients: {
            include: { ingredient: true }
          },
          diseases: {
            include: { disease: true }
          }
        }
      });
    } catch (error) {
      throw new BadRequestException('Impossible de récupérer les remèdes. Veuillez réessayer plus tard.');
    }
  }

  // Récupérer un remède par son ID
  async findOne(id: string) {
    const remedy = await this.prisma.remedy.findUnique({
      where: { id, deleted: false },
    });

    if (!remedy) {
      throw new NotFoundException(`Le remède avec l'ID ${id} n'existe pas ou a été supprimé.`);
    }

    return remedy;
  }

// Mettre à jour un remède existant
async update(id: string, updateRemedyDto: CreateRemedyDto) {
  const { name, description, value, ingredientIds, newIngredients, instructions, newInstructions, diseaseIds } = updateRemedyDto;

  // Utiliser une transaction Prisma pour garantir l'atomicité
  return this.prisma.$transaction(async (prisma) => {
    try {
      // Vérifier si le remède existe
      const existingRemedy = await prisma.remedy.findUnique({
        where: { id },
        include: {
          instructions: true,
          ingredients: true,
          diseases: true
        }
      });

      if (!existingRemedy) {
        throw new NotFoundException(`Remède avec l'ID ${id} non trouvé`);
      }

      // Mettre à jour les données de base du remède
      const updatedRemedy = await prisma.remedy.update({
        where: { id },
        data: {
          name: name !== undefined ? name : existingRemedy.name,
          description: description !== undefined ? description : existingRemedy.description,
          value: value !== undefined ? value : existingRemedy.value,
        },
      });

      // Gérer les ingrédients
      if (ingredientIds !== undefined) {
        // Supprimer les relations d'ingrédients existantes
        await prisma.remedyIngredient.deleteMany({
          where: { remedyId: id }
        });

        // Ajouter les nouvelles relations d'ingrédients
        if (ingredientIds.length > 0) {
          const ingredientRelations = ingredientIds.map(ingredientId => ({
            remedyId: id,
            ingredientId,
          }));

          await prisma.remedyIngredient.createMany({
            data: ingredientRelations,
          });
        }

        
      }

      // Créer et associer de nouveaux ingrédients
      if (newIngredients && newIngredients.length > 0) {
        for (const newIngredient of newIngredients) {
          // Utiliser le service d'ingrédients avec la transaction
          const ingredient = await this.ingredientService.create(newIngredient, prisma);
          
          await prisma.remedyIngredient.create({
            data: {
              remedyId: id,
              ingredientId: ingredient.id,
            },
          });
        }
      }

      // Gérer les instructions
      if (instructions !== undefined) {
        // Supprimer les instructions existantes
        await prisma.instruction.deleteMany({
          where: { remedyId: id }
        });

        // Ajouter les nouvelles instructions
        if (instructions.length > 0) {
          const instructionsData = instructions.map((instruction, index) => ({
            stepNumber: index + 1,
            text: instruction.text,
            remedyId: id,
          }));

          await prisma.instruction.createMany({
            data: instructionsData,
          });
        }
      }

      // Gérer l'association aux maladies (maintenant au pluriel)
      if (diseaseIds !== undefined) {
        // Supprimer les associations existantes
        await prisma.remedyDisease.deleteMany({
          where: { remedyId: id }
        });

        // Créer les nouvelles associations si des maladies sont spécifiées
        if (diseaseIds.length > 0) {
          const diseaseRelations = diseaseIds.map(diseaseId => ({
            diseaseId,
            remedyId: id,
          }));

          await prisma.remedyDisease.createMany({
            data: diseaseRelations,
          });
        }
      }

      // Récupérer et retourner le remède mis à jour avec toutes ses relations
      return prisma.remedy.findUnique({
        where: { id },
        include: {
          instructions: {
            orderBy: { stepNumber: 'asc' }
          },
          ingredients: {
            include: { ingredient: true }
          },
          diseases: {
            include: { disease: true }
          }
        }
      });
    } catch (error) {
      // La transaction va automatiquement annuler tous les changements en cas d'erreur

      // Gestion des erreurs spécifiques
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ConflictException('Un remède avec ce nom existe déjà');
        }
        if (error.code === 'P2003') {
          throw new BadRequestException('Contrainte de clé étrangère invalide');
        }
      }

      // Pour les erreurs de type NotFoundException
      if (error instanceof NotFoundException) {
        throw error;
      }

      // Pour les autres types d'erreurs
      if (error instanceof BadRequestException) {
        throw error;
      }

      // Erreur générique pour les problèmes inattendus
      throw new InternalServerErrorException('Impossible de mettre à jour le remède. Veuillez réessayer.');
    }
  }, {
    // Options de transaction
    maxWait: 5000, // Temps d'attente maximum pour la transaction
    timeout: 10000 // Délai total maximum pour la transaction
  });
}
  // Supprimer un remède (marqué comme supprimé)
  async delete(id: string) {
    const remedy = await this.prisma.remedy.findUnique({
      where: { id, deleted: false },
    });

    if (!remedy) {
      throw new NotFoundException(`Le remède avec l'ID ${id} n'existe pas ou a déjà été supprimé.`);
    }

    try {
      return await this.prisma.remedy.update({
        where: { id },
        data: { deleted: true },
      });
    } catch (error) {
      throw new BadRequestException('Impossible de supprimer le remède. Veuillez réessayer.');
    }
  }
}