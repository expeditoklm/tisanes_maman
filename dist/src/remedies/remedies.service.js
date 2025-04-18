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
exports.RemedyService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const ingredients_service_1 = require("../ingredients/ingredients.service");
const client_1 = require("@prisma/client");
const common_2 = require("@nestjs/common");
let RemedyService = class RemedyService {
    constructor(prisma, ingredientService) {
        this.prisma = prisma;
        this.ingredientService = ingredientService;
    }
    async create(createRemedyDto) {
        const { name, description, value, ingredientIds, newIngredients, instructions, diseaseIds } = createRemedyDto;
        return this.prisma.$transaction(async (prisma) => {
            try {
                if (!name) {
                    throw new common_1.BadRequestException('Name is required');
                }
                const remedy = await prisma.remedy.create({
                    data: {
                        name,
                        description,
                        value,
                    },
                });
                if (ingredientIds && ingredientIds.length > 0) {
                    const ingredientRelations = ingredientIds.map(ingredientId => ({
                        remedyId: remedy.id,
                        ingredientId,
                    }));
                    await prisma.remedyIngredient.createMany({
                        data: ingredientRelations,
                    });
                }
                if (newIngredients && newIngredients.length > 0) {
                    for (const newIngredient of newIngredients) {
                        const ingredient = await this.ingredientService.create(newIngredient, prisma);
                        await prisma.remedyIngredient.create({
                            data: {
                                remedyId: remedy.id,
                                ingredientId: ingredient.id,
                            },
                        });
                    }
                }
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
                if (diseaseIds && diseaseIds.length > 0) {
                    const diseaseRelations = diseaseIds.map(diseaseId => ({
                        diseaseId,
                        remedyId: remedy.id,
                    }));
                    await prisma.remedyDisease.createMany({
                        data: diseaseRelations,
                    });
                }
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
            }
            catch (error) {
                if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                    if (error.code === 'P2002') {
                        throw new common_2.ConflictException('Un remède avec ce nom existe déjà');
                    }
                    if (error.code === 'P2003') {
                        throw new common_1.BadRequestException('Contrainte de clé étrangère invalide');
                    }
                }
                if (error instanceof common_1.BadRequestException) {
                    throw error;
                }
                throw new common_2.InternalServerErrorException('Impossible de créer le remède. Veuillez réessayer.');
            }
        }, {
            maxWait: 5000,
            timeout: 10000
        });
    }
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
        }
        catch (error) {
            throw new common_1.BadRequestException('Impossible de récupérer les remèdes. Veuillez réessayer plus tard.');
        }
    }
    async findOne(id) {
        const remedy = await this.prisma.remedy.findUnique({
            where: { id, deleted: false },
        });
        if (!remedy) {
            throw new common_1.NotFoundException(`Le remède avec l'ID ${id} n'existe pas ou a été supprimé.`);
        }
        return remedy;
    }
    async update(id, updateRemedyDto) {
        const { name, description, value, ingredientIds, newIngredients, instructions, newInstructions, diseaseIds } = updateRemedyDto;
        return this.prisma.$transaction(async (prisma) => {
            try {
                const existingRemedy = await prisma.remedy.findUnique({
                    where: { id },
                    include: {
                        instructions: true,
                        ingredients: true,
                        diseases: true
                    }
                });
                if (!existingRemedy) {
                    throw new common_1.NotFoundException(`Remède avec l'ID ${id} non trouvé`);
                }
                const updatedRemedy = await prisma.remedy.update({
                    where: { id },
                    data: {
                        name: name !== undefined ? name : existingRemedy.name,
                        description: description !== undefined ? description : existingRemedy.description,
                        value: value !== undefined ? value : existingRemedy.value,
                    },
                });
                if (ingredientIds !== undefined) {
                    await prisma.remedyIngredient.deleteMany({
                        where: { remedyId: id }
                    });
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
                if (newIngredients && newIngredients.length > 0) {
                    for (const newIngredient of newIngredients) {
                        const ingredient = await this.ingredientService.create(newIngredient, prisma);
                        await prisma.remedyIngredient.create({
                            data: {
                                remedyId: id,
                                ingredientId: ingredient.id,
                            },
                        });
                    }
                }
                if (instructions !== undefined) {
                    await prisma.instruction.deleteMany({
                        where: { remedyId: id }
                    });
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
                if (diseaseIds !== undefined) {
                    await prisma.remedyDisease.deleteMany({
                        where: { remedyId: id }
                    });
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
            }
            catch (error) {
                if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                    if (error.code === 'P2002') {
                        throw new common_2.ConflictException('Un remède avec ce nom existe déjà');
                    }
                    if (error.code === 'P2003') {
                        throw new common_1.BadRequestException('Contrainte de clé étrangère invalide');
                    }
                }
                if (error instanceof common_1.NotFoundException) {
                    throw error;
                }
                if (error instanceof common_1.BadRequestException) {
                    throw error;
                }
                throw new common_2.InternalServerErrorException('Impossible de mettre à jour le remède. Veuillez réessayer.');
            }
        }, {
            maxWait: 5000,
            timeout: 10000
        });
    }
    async delete(id) {
        const remedy = await this.prisma.remedy.findUnique({
            where: { id, deleted: false },
        });
        if (!remedy) {
            throw new common_1.NotFoundException(`Le remède avec l'ID ${id} n'existe pas ou a déjà été supprimé.`);
        }
        try {
            return await this.prisma.remedy.update({
                where: { id },
                data: { deleted: true },
            });
        }
        catch (error) {
            throw new common_1.BadRequestException('Impossible de supprimer le remède. Veuillez réessayer.');
        }
    }
};
exports.RemedyService = RemedyService;
exports.RemedyService = RemedyService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService, ingredients_service_1.IngredientService])
], RemedyService);
//# sourceMappingURL=remedies.service.js.map