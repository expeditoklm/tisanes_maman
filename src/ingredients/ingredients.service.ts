import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateIngredientDto, UpdateIngredientDto } from './dto/ingredient.dto';

import { v4 as uuidv4 } from 'uuid';
import * as fs from 'fs';
import * as path from 'path';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class IngredientService {
  constructor(private prisma: PrismaService) {}

  async create(
    createIngredientDto: CreateIngredientDto, 
    prisma?: Omit<PrismaClient, "$connect" | "$disconnect" | "$on" | "$transaction" | "$use" | "$extends">
  ) {
    // Use the passed prisma client or the default service prisma client
    const dataSource = prisma || this.prisma;

    const { name, description, imgUrls } = createIngredientDto;

    // Check if ingredient already exists (soft-deleted included)
    const existingIngredient = await dataSource.ingredient.findFirst({
      where: { name },
    });

    if (existingIngredient) {
      throw new BadRequestException('Cet ingrédient existe déjà dans la base de données.');
    }

    // Traiter les photos si elles existent
    let savedImageUrls: string[] = [];
    if (imgUrls && imgUrls.length > 0) {
      try {
        savedImageUrls = await this.savePhotos(imgUrls);
      } catch (error) {
        throw new BadRequestException('Erreur lors de la sauvegarde des photos');
      }
    }

    try {
      let newIngredient = await dataSource.ingredient.create({
        data: {
          name,
          description,
        },
      });

      // Traiter chaque image
      for (const savedImageUrl of savedImageUrls) {
        await dataSource.photo.create({
          data: {
            url: savedImageUrl,
            ingredientId: newIngredient.id,
          },
        });
      }

      return newIngredient;

    } catch (error) {
      throw new BadRequestException('Erreur lors de la création de l\'ingrédient.');
    }
  }

  // Méthode pour sauvegarder plusieurs images
  private async savePhotos(base64Images: string[]): Promise<string[]> {
    try {
      const savedUrls: string[] = [];
      
      // Créer le chemin du dossier uploads s'il n'existe pas
      const uploadDir = path.join(process.cwd(), 'uploads');
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      // Traiter chaque image
      for (const base64Image of base64Images) {
        // Enlever le préfixe data:image/...;base64,
        const base64Data = base64Image.replace(/^data:image\/\w+;base64,/, '');
        
        // Créer le buffer
        const imageBuffer = Buffer.from(base64Data, 'base64');
        
        // Générer un nom de fichier unique
        const fileName = `ingredient_${uuidv4()}.jpg`;
        
        // Chemin complet du fichier
        const filePath = path.join(uploadDir, fileName);
        
        // Écrire le fichier
        await fs.promises.writeFile(filePath, imageBuffer);
        
        // Ajouter l'URL relative au tableau
        savedUrls.push(`/uploads/${fileName}`);
      }
      
      return savedUrls;
    } catch (error) {
      console.error('Error saving photos:', error);
      throw new BadRequestException('Failed to save photos');
    }
  }

  async update(id: string, updateIngredientDto: UpdateIngredientDto) {
    console.log('Service - Mise à jour de l\'ingrédient:', id, updateIngredientDto);
    
    try {
      const ingredient = await this.prisma.ingredient.findUnique({
        where: { id },
        include: { 
          photos: {
            where: { deleted: false }
          }
        }
      });
  
      if (!ingredient) {
        throw new NotFoundException('L\'ingrédient demandé n\'existe pas.');
      }
  
      if (ingredient.deleted) {
        throw new BadRequestException('Impossible de mettre à jour un ingrédient supprimé.');
      }
  
      // Extraire les données à mettre à jour pour l'ingrédient
      const { imgUrls, photoIdsToDelete, ...ingredientData } = updateIngredientDto;
      
      console.log('Photos à supprimer:', photoIdsToDelete);
      
      // Transaction pour s'assurer que toutes les opérations réussissent ou échouent ensemble
      return await this.prisma.$transaction(async (prisma) => {
        // Mettre à jour les données de base de l'ingrédient
        const updatedIngredient = await prisma.ingredient.update({
          where: { id },
          data: ingredientData
        });
        
        // Supprimer les photos si demandé
        if (photoIdsToDelete && photoIdsToDelete.length > 0) {
          console.log(`Suppression de ${photoIdsToDelete.length} photos`);
          await prisma.photo.updateMany({
            where: {
              id: { in: photoIdsToDelete },
              ingredientId: id
            },
            data: { deleted: true }
          });
        }
        
        // Traiter les nouvelles photos si elles existent
        if (imgUrls && imgUrls.length > 0) {
          try {
            const savedImageUrls = await this.savePhotos(imgUrls);
            
            // Créer les entrées pour les nouvelles photos
            for (const url of savedImageUrls) {
              await prisma.photo.create({
                data: {
                  url,
                  ingredientId: id
                }
              });
            }
          } catch (error) {
            console.error('Erreur lors de la sauvegarde des photos:', error);
            throw new BadRequestException('Erreur lors de la sauvegarde des photos');
          }
        }
        
        // Récupérer l'ingrédient mis à jour avec ses photos
        return await prisma.ingredient.findUnique({
          where: { id },
          include: {
            photos: {
              where: { deleted: false }
            }
          }
        });
      });
    } catch (error) {
      console.error('Erreur détaillée de mise à jour:', error);
      throw new BadRequestException('Erreur lors de la mise à jour de l\'ingrédient.');
    }
  }








  async findAll() {
    try {
      return await this.prisma.ingredient.findMany({
        where: { deleted: false },
        include: {
          photos: {
            where: { deleted: false }
          }
        }
      });
    } catch (error) {
      throw new BadRequestException('Erreur lors de la récupération des ingrédients.');
    }
  }

  async findOne(id: string) {
    const ingredient = await this.prisma.ingredient.findUnique({
      where: { id },
      include: {
        photos: {
          where: { deleted: false }
        }
      }
    });

    if (!ingredient) {
      throw new NotFoundException('L\'ingrédient demandé n\'existe pas.');
    }

    if (ingredient.deleted) {
      throw new NotFoundException('L\'ingrédient a été supprimé.');
    }

    return ingredient;
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