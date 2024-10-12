import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateInstructionDto, UpdateInstructionDto } from './dto/instructions.dto';

@Injectable()
export class InstructionService {
  constructor(private readonly prisma: PrismaService) {}

  // Créer une nouvelle instruction
  async create(createInstructionDto: CreateInstructionDto) {
    const { stepNumber, text, remedyId } = createInstructionDto;

    // Vérification de l'existence du remède
    const remedy = await this.prisma.remedy.findUnique({ where: { id: remedyId } });
    if (!remedy || remedy.deleted) {
      throw new NotFoundException('Le remède spécifié n\'existe pas ou a été supprimé.');
    }

    // Création de l'instruction
    try {
      return await this.prisma.instruction.create({
        data: {
          stepNumber,
          text,
          remedyId,
        },
      });
    } catch (error) {
      throw new BadRequestException('Erreur lors de la création de l\'instruction.');
    }
  }

  // Récupérer toutes les instructions d'un remède
  async findAll(remedyId: string) {
    // Vérification de l'existence du remède
    const remedy = await this.prisma.remedy.findUnique({ where: { id: remedyId } });
    if (!remedy || remedy.deleted) {
      throw new NotFoundException('Le remède spécifié n\'existe pas ou a été supprimé.');
    }

    try {
      return await this.prisma.instruction.findMany({
        where: { remedyId, deleted: false },
        orderBy: { stepNumber: 'asc' }, // Trier par numéro d'étape
      });
    } catch (error) {
      throw new BadRequestException('Erreur lors de la récupération des instructions.');
    }
  }

  // Récupérer une instruction spécifique
  async findOne(id: string) {
    // Vérification de l'existence de l'instruction
    const instruction = await this.prisma.instruction.findUnique({ where: { id } });
    if (!instruction || instruction.deleted) {
      throw new NotFoundException('L\'instruction spécifiée n\'existe pas ou a été supprimée.');
    }

    return instruction;
  }

  // Mettre à jour une instruction
  async update(id: string, updateInstructionDto: UpdateInstructionDto) {
    const instruction = await this.prisma.instruction.findUnique({
      where: { id },
    });

    if (!instruction || instruction.deleted) {
      throw new NotFoundException('L\'instruction que vous essayez de mettre à jour n\'existe pas ou a été supprimée.');
    }

    // Vérification si l'ID du remède est valide
    if (updateInstructionDto.remedyId) {
      const remedy = await this.prisma.remedy.findUnique({ where: { id: updateInstructionDto.remedyId } });
      if (!remedy || remedy.deleted) {
        throw new NotFoundException('Le remède spécifié n\'existe pas ou a été supprimé.');
      }
    }

    try {
      return await this.prisma.instruction.update({
        where: { id },
        data: { ...updateInstructionDto },
      });
    } catch (error) {
      throw new BadRequestException('Erreur lors de la mise à jour de l\'instruction.');
    }
  }

  // Supprimer une instruction
  async remove(id: string) {
    const instruction = await this.prisma.instruction.findUnique({
      where: { id },
    });

    if (!instruction || instruction.deleted) {
      throw new NotFoundException('L\'instruction que vous essayez de supprimer n\'existe pas ou a déjà été supprimée.');
    }

    try {
      await this.prisma.instruction.update({
        where: { id },
        data: { deleted: true },
      });

      return { message: 'Instruction supprimée avec succès.' };
    } catch (error) {
      throw new BadRequestException('Erreur lors de la suppression de l\'instruction.');
    }
  }
}
