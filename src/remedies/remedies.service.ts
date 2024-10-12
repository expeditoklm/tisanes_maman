import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateRemedyDto } from './dto/remedy.dto';
import { UpdateRemedyDto } from './dto/remedy.dto';



@Injectable()
export class RemedyService {
  constructor(private prisma: PrismaService) {}

  // Créer un nouveau remède
  async create(createRemedyDto: CreateRemedyDto) {
    try {
      const remedy = await this.prisma.remedy.create({
        data: {
          name: createRemedyDto.name,
          description: createRemedyDto.description,
        },
      });
      return remedy;
    } catch (error) {
      throw new BadRequestException('Impossible de créer le remède. Veuillez vérifier les informations fournies.');
    }
  }

  // Récupérer tous les remèdes
  async findAll() {
    try {
      return await this.prisma.remedy.findMany({
        where: { deleted: false },
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

  // Mettre à jour un remède
  async update(id: string, updateRemedyDto: UpdateRemedyDto) {
    const remedy = await this.prisma.remedy.findUnique({
      where: { id, deleted: false },
    });

    if (!remedy) {
      throw new NotFoundException(`Le remède avec l'ID ${id} n'existe pas ou a été supprimé.`);
    }

    try {
      return await this.prisma.remedy.update({
        where: { id },
        data: {
          ...updateRemedyDto,
          updatedAt: new Date(),
        },
      });
    } catch (error) {
      throw new BadRequestException('Une erreur est survenue lors de la mise à jour du remède.');
    }
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
