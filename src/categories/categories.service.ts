// src/category/category.service.ts
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCategoryDto, UpdateCategoryDto } from './dto/categories.dto';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  async create(createCategoryDto: CreateCategoryDto) {
    const { name } = createCategoryDto;

    if (!name) {
      throw new BadRequestException('Le nom de la catégorie est requis pour créer une nouvelle catégorie.');
    }

    try {
      const category = await this.prisma.category.create({
        data: {
          name,
        },
      });
      return category;
    } catch (error) {
      throw new BadRequestException('Erreur lors de la création de la catégorie. Veuillez réessayer.');
    }
  }

  async findAll() {
    try {
      return await this.prisma.category.findMany({
        where: {
          deleted: false,
        },
        include: {
          diseases: {
            where: {
              deleted: false,
            },
          },
        },
      });
    } catch (error) {
      throw new BadRequestException('Erreur lors de la récupération des catégories.');
    }
  }

  async findOne(id: string) {
    try {
      const category = await this.prisma.category.findUnique({
        where: { id },
        include: {
          diseases: {
            where: {
              deleted: false,
            },
          },
        },
      });

      if (!category || category.deleted) {
        throw new NotFoundException('La catégorie demandée n\'existe pas ou a été supprimée.');
      }

      return category;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException('Erreur lors de la récupération de la catégorie. Veuillez vérifier l\'ID.');
    }
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {

     // Check for empty update object
  if (!updateCategoryDto || Object.keys(updateCategoryDto).length === 0) {
    throw new BadRequestException('Aucune donnée fournie pour la mise à jour de la catégorie.');
  }
    const category = await this.prisma.category.findUnique({
      where: { id },
    });

    if (!category || category.deleted) {
      throw new NotFoundException('La catégorie que vous essayez de mettre à jour n\'existe pas ou a été supprimée.');
    }

    try {
      return await this.prisma.category.update({
        where: { id },
        data: {
          ...updateCategoryDto,
        },
      });
    } catch (error) {
      throw new BadRequestException('Erreur lors de la mise à jour de la catégorie. Veuillez réessayer.');
    }
  }

  async remove(id: string) {
    const category = await this.prisma.category.findUnique({
      where: { id },
    });

    if (!category || category.deleted) {
      throw new NotFoundException('La catégorie que vous essayez de supprimer n\'existe pas ou a déjà été supprimée.');
    }

    try {
      await this.prisma.category.update({
        where: { id },
        data: { deleted: true },
      });
      return { message: 'Catégorie supprimée avec succès.' };
    } catch (error) {
      throw new BadRequestException('Erreur lors de la suppression de la catégorie.');
    }
  }
}