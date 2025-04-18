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
exports.CategoryService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let CategoryService = class CategoryService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createCategoryDto) {
        const { name } = createCategoryDto;
        if (!name) {
            throw new common_1.BadRequestException('Le nom de la catégorie est requis pour créer une nouvelle catégorie.');
        }
        try {
            const category = await this.prisma.category.create({
                data: {
                    name,
                },
            });
            return category;
        }
        catch (error) {
            throw new common_1.BadRequestException('Erreur lors de la création de la catégorie. Veuillez réessayer.');
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
        }
        catch (error) {
            throw new common_1.BadRequestException('Erreur lors de la récupération des catégories.');
        }
    }
    async findOne(id) {
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
                throw new common_1.NotFoundException('La catégorie demandée n\'existe pas ou a été supprimée.');
            }
            return category;
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            throw new common_1.BadRequestException('Erreur lors de la récupération de la catégorie. Veuillez vérifier l\'ID.');
        }
    }
    async update(id, updateCategoryDto) {
        if (!updateCategoryDto || Object.keys(updateCategoryDto).length === 0) {
            throw new common_1.BadRequestException('Aucune donnée fournie pour la mise à jour de la catégorie.');
        }
        const category = await this.prisma.category.findUnique({
            where: { id },
        });
        if (!category || category.deleted) {
            throw new common_1.NotFoundException('La catégorie que vous essayez de mettre à jour n\'existe pas ou a été supprimée.');
        }
        try {
            return await this.prisma.category.update({
                where: { id },
                data: {
                    ...updateCategoryDto,
                },
            });
        }
        catch (error) {
            throw new common_1.BadRequestException('Erreur lors de la mise à jour de la catégorie. Veuillez réessayer.');
        }
    }
    async remove(id) {
        const category = await this.prisma.category.findUnique({
            where: { id },
        });
        if (!category || category.deleted) {
            throw new common_1.NotFoundException('La catégorie que vous essayez de supprimer n\'existe pas ou a déjà été supprimée.');
        }
        try {
            await this.prisma.category.update({
                where: { id },
                data: { deleted: true },
            });
            return { message: 'Catégorie supprimée avec succès.' };
        }
        catch (error) {
            throw new common_1.BadRequestException('Erreur lors de la suppression de la catégorie.');
        }
    }
};
exports.CategoryService = CategoryService;
exports.CategoryService = CategoryService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CategoryService);
//# sourceMappingURL=categories.service.js.map