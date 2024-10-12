import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateRemedyDiseaseDto, UpdateRemedyDiseaseDto } from './dto/remedy-disease.dto';

@Injectable()
export class RemedyDiseaseService {
  constructor(private prisma: PrismaService) {}

  async create(createRemedyDiseaseDto: CreateRemedyDiseaseDto) {
    const { remedyId, diseaseId } = createRemedyDiseaseDto;

    // Vérifier les IDs
    if (!remedyId || !diseaseId) {
      throw new BadRequestException('Les IDs de la maladie et du remède sont requis.');
    }

    // Vérification des existences et du statut deleted
    const remedy = await this.prisma.remedy.findUnique({ where: { id: remedyId } });
    const disease = await this.prisma.disease.findUnique({ where: { id: diseaseId } });

    if (!remedy || remedy.deleted) {
      throw new NotFoundException('Le remède spécifié n’existe pas ou a été supprimé.');
    }
    if (!disease || disease.deleted) {
      throw new NotFoundException('La maladie spécifiée n’existe pas ou a été supprimée.');
    }

    // Créer l'association
    try {
      return await this.prisma.remedyDisease.create({
        data: {
          remedyId,
          diseaseId,
        },
      });
    } catch (error) {
      throw new BadRequestException('Erreur lors de l\'association du remède à la maladie.');
    }
  }

  async findAll() {
    try {
      return await this.prisma.remedyDisease.findMany({
        where: { deleted: false },
      });
    } catch (error) {
      throw new BadRequestException('Erreur lors de la récupération des associations.');
    }
  }

  async findOne(remedyId: string, diseaseId: string) {
    if (!remedyId || !diseaseId) {
      throw new BadRequestException('Les IDs du remède et de la maladie sont requis pour la recherche.');
    }

    try {
      const remedyDisease = await this.prisma.remedyDisease.findUnique({
        where: {
          remedyId_diseaseId: { remedyId, diseaseId },
        },
      });

      if (!remedyDisease || remedyDisease.deleted) {
        throw new NotFoundException('L\'association remède-maladie demandée n\'existe pas ou a été supprimée.');
      }

      return remedyDisease;
    } catch (error) {
      throw new BadRequestException('Erreur lors de la récupération de l\'association remède-maladie.');
    }
  }

  async update(remedyId: string, diseaseId: string, updateRemedyDiseaseDto: UpdateRemedyDiseaseDto) {
    const existing = await this.prisma.remedyDisease.findUnique({
      where: { remedyId_diseaseId: { remedyId, diseaseId } },
    });

    if (!existing || existing.deleted) {
      throw new NotFoundException('L\'association que vous essayez de mettre à jour n\'existe pas ou a été supprimée.');
    }

    // Vérification des nouveaux IDs s'ils sont présents
    if (updateRemedyDiseaseDto.remedyId) {
      const remedy = await this.prisma.remedy.findUnique({ where: { id: updateRemedyDiseaseDto.remedyId } });
      if (!remedy || remedy.deleted) {
        throw new NotFoundException('Le nouveau remède spécifié n\'existe pas ou a été supprimé.');
      }
    }

    if (updateRemedyDiseaseDto.diseaseId) {
      const disease = await this.prisma.disease.findUnique({ where: { id: updateRemedyDiseaseDto.diseaseId } });
      if (!disease || disease.deleted) {
        throw new NotFoundException('La nouvelle maladie spécifiée n\'existe pas ou a été supprimée.');
      }
    }

    try {
      return await this.prisma.remedyDisease.update({
        where: { remedyId_diseaseId: { remedyId, diseaseId } },
        data: { ...updateRemedyDiseaseDto },
      });
    } catch (error) {
      throw new BadRequestException('Erreur lors de la mise à jour de l\'association remède-maladie.');
    }
  }

  async remove(remedyId: string, diseaseId: string) {
    const existing = await this.prisma.remedyDisease.findUnique({
      where: { remedyId_diseaseId: { remedyId, diseaseId } },
    });

    if (!existing || existing.deleted) {
      throw new NotFoundException('L\'association que vous essayez de supprimer n\'existe pas ou a déjà été supprimée.');
    }

    try {
      await this.prisma.remedyDisease.update({
        where: { remedyId_diseaseId: { remedyId, diseaseId } },
        data: { deleted: true },
      });

      return { message: 'Association remède-maladie supprimée avec succès.' };
    } catch (error) {
      throw new BadRequestException('Erreur lors de la suppression de l\'association remède-maladie.');
    }
  }
}
