"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IngredientService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const uuid_1 = require("uuid");
const fs = require("fs");
const path = require("path");
let IngredientService = class IngredientService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createIngredientDto, prisma) {
        const dataSource = prisma || this.prisma;
        const { name, description, imgUrls } = createIngredientDto;
        const existingIngredient = await dataSource.ingredient.findFirst({
            where: { name },
        });
        if (existingIngredient) {
            throw new common_1.BadRequestException('Cet ingrédient existe déjà dans la base de données.');
        }
        let savedImageUrls = [];
        if (imgUrls && imgUrls.length > 0) {
            try {
                savedImageUrls = await this.savePhotos(imgUrls);
            }
            catch (error) {
                throw new common_1.BadRequestException('Erreur lors de la sauvegarde des photos');
            }
        }
        try {
            let newIngredient = await dataSource.ingredient.create({
                data: {
                    name,
                    description,
                },
            });
            for (const savedImageUrl of savedImageUrls) {
                await dataSource.photo.create({
                    data: {
                        url: savedImageUrl,
                        ingredientId: newIngredient.id,
                    },
                });
            }
            return newIngredient;
        }
        catch (error) {
            throw new common_1.BadRequestException('Erreur lors de la création de l\'ingrédient.');
        }
    }
    async savePhotos(base64Images) {
        try {
            const savedUrls = [];
            const uploadDir = path.join(process.cwd(), 'uploads');
            if (!fs.existsSync(uploadDir)) {
                fs.mkdirSync(uploadDir, { recursive: true });
            }
            for (const base64Image of base64Images) {
                const base64Data = base64Image.replace(/^data:image\/\w+;base64,/, '');
                const imageBuffer = Buffer.from(base64Data, 'base64');
                const fileName = `ingredient_${(0, uuid_1.v4)()}.jpg`;
                const filePath = path.join(uploadDir, fileName);
                await fs.promises.writeFile(filePath, imageBuffer);
                savedUrls.push(`/uploads/${fileName}`);
            }
            return savedUrls;
        }
        catch (error) {
            console.error('Error saving photos:', error);
            throw new common_1.BadRequestException('Failed to save photos');
        }
    }
    async update(id, updateIngredientDto) {
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
                throw new common_1.NotFoundException('L\'ingrédient demandé n\'existe pas.');
            }
            if (ingredient.deleted) {
                throw new common_1.BadRequestException('Impossible de mettre à jour un ingrédient supprimé.');
            }
            const { imgUrls, photoIdsToDelete, ...ingredientData } = updateIngredientDto;
            console.log('Photos à supprimer:', photoIdsToDelete);
            return await this.prisma.$transaction(async (prisma) => {
                const updatedIngredient = await prisma.ingredient.update({
                    where: { id },
                    data: ingredientData
                });
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
                if (imgUrls && imgUrls.length > 0) {
                    try {
                        const savedImageUrls = await this.savePhotos(imgUrls);
                        for (const url of savedImageUrls) {
                            await prisma.photo.create({
                                data: {
                                    url,
                                    ingredientId: id
                                }
                            });
                        }
                    }
                    catch (error) {
                        console.error('Erreur lors de la sauvegarde des photos:', error);
                        throw new common_1.BadRequestException('Erreur lors de la sauvegarde des photos');
                    }
                }
                return await prisma.ingredient.findUnique({
                    where: { id },
                    include: {
                        photos: {
                            where: { deleted: false }
                        }
                    }
                });
            });
        }
        catch (error) {
            console.error('Erreur détaillée de mise à jour:', error);
            throw new common_1.BadRequestException('Erreur lors de la mise à jour de l\'ingrédient.');
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
        }
        catch (error) {
            throw new common_1.BadRequestException('Erreur lors de la récupération des ingrédients.');
        }
    }
    async findOne(id) {
        const ingredient = await this.prisma.ingredient.findUnique({
            where: { id },
            include: {
                photos: {
                    where: { deleted: false }
                }
            }
        });
        if (!ingredient) {
            throw new common_1.NotFoundException('L\'ingrédient demandé n\'existe pas.');
        }
        if (ingredient.deleted) {
            throw new common_1.NotFoundException('L\'ingrédient a été supprimé.');
        }
        return ingredient;
    }
    async remove(id) {
        const ingredient = await this.prisma.ingredient.findUnique({
            where: { id },
        });
        if (!ingredient) {
            throw new common_1.NotFoundException('L\'ingrédient demandé n\'existe pas.');
        }
        if (ingredient.deleted) {
            throw new common_1.BadRequestException('Cet ingrédient est déjà supprimé.');
        }
        try {
            return await this.prisma.ingredient.update({
                where: { id },
                data: { deleted: true },
            });
        }
        catch (error) {
            throw new common_1.BadRequestException('Erreur lors de la suppression de l\'ingrédient.');
        }
    }
};
exports.IngredientService = IngredientService;
exports.IngredientService = IngredientService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], IngredientService);
//# sourceMappingURL=ingredients.service.js.map