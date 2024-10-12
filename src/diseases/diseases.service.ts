import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateDiseaseDto ,UpdateDiseaseDto } from './dto/diseases.dto';

@Injectable()
export class DiseaseService {
  constructor(private prisma: PrismaService) {}

  async create(createDiseaseDto: CreateDiseaseDto) {
    const { name } = createDiseaseDto;

    if (!name) {
      throw new BadRequestException('Le nom de la maladie est requis pour créer une nouvelle maladie.');
    }

    try {
      const disease = await this.prisma.disease.create({
        data: {
          ...createDiseaseDto,
        },
      });
      return disease;
    } catch (error) {
      throw new BadRequestException('Erreur lors de la création de la maladie. Veuillez réessayer.');
    }
  }

  async findAll() {
    try {
      return await this.prisma.disease.findMany({
        where: {
          deleted: false,
        },
      });
    } catch (error) {
      throw new BadRequestException('Erreur lors de la récupération des maladies.');
    }
  }

  async findOne(id: string) {
    try {
      const disease = await this.prisma.disease.findUnique({
        where: { id },
      });

      if (!disease || disease.deleted) {
        throw new NotFoundException('La maladie demandée n’existe pas ou a été supprimée.');
      }

      return disease;
    } catch (error) {
      throw new BadRequestException('Erreur lors de la récupération de la maladie. Veuillez vérifier l’ID.');
    }
  }

  async update(id: string, updateDiseaseDto: UpdateDiseaseDto) {
    const disease = await this.prisma.disease.findUnique({
      where: { id },
    });

    if (!disease || disease.deleted) {
      throw new NotFoundException('La maladie que vous essayez de mettre à jour n’existe pas ou a été supprimée.');
    }

    try {
      return await this.prisma.disease.update({
        where: { id },
        data: {
          ...updateDiseaseDto,
        },
      });
    } catch (error) {
      throw new BadRequestException('Erreur lors de la mise à jour de la maladie. Veuillez réessayer.');
    }
  }

  async remove(id: string) {
    const disease = await this.prisma.disease.findUnique({
      where: { id },
    });

    if (!disease || disease.deleted) {
      throw new NotFoundException('La maladie que vous essayez de supprimer n’existe pas ou a déjà été supprimée.');
    }

    try {
      await this.prisma.disease.update({
        where: { id },
        data: { deleted: true },
      });
      return { message: 'Maladie supprimée avec succès.' };
    } catch (error) {
      throw new BadRequestException('Erreur lors de la suppression de la maladie.');
    }
  }
}
