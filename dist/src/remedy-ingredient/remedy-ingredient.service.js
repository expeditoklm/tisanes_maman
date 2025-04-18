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
exports.RemedyIngredientService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let RemedyIngredientService = class RemedyIngredientService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createRemedyIngredientDto) {
        const { remedyId, ingredientId, quantity } = createRemedyIngredientDto;
        const remedy = await this.prisma.remedy.findUnique({ where: { id: remedyId } });
        const ingredient = await this.prisma.ingredient.findUnique({ where: { id: ingredientId } });
        if (!remedy || remedy.deleted) {
            throw new common_1.NotFoundException('Le remède spécifié est introuvable ou a été supprimé.');
        }
        if (!ingredient || ingredient.deleted) {
            throw new common_1.NotFoundException('L\'ingrédient spécifié est introuvable ou a été supprimé.');
        }
        try {
            return await this.prisma.remedyIngredient.create({
                data: {
                    remedyId,
                    ingredientId,
                    quantity,
                },
            });
        }
        catch (error) {
            throw new common_1.BadRequestException('Erreur lors de l\'ajout de l\'ingrédient au remède.');
        }
    }
    async findAll() {
        try {
            return await this.prisma.remedyIngredient.findMany({
                where: { deleted: false },
                include: { remedy: true, ingredient: true },
            });
        }
        catch (error) {
            throw new common_1.BadRequestException('Erreur lors de la récupération des données.');
        }
    }
    async findOne(remedyId, ingredientId) {
        const remedyIngredient = await this.prisma.remedyIngredient.findUnique({
            where: { remedyId_ingredientId: { remedyId, ingredientId } },
            include: { remedy: true, ingredient: true },
        });
        if (!remedyIngredient) {
            throw new common_1.NotFoundException('La relation remède-ingrédient spécifiée est introuvable.');
        }
        if (remedyIngredient.deleted) {
            throw new common_1.NotFoundException('Cette relation a été supprimée.');
        }
        return remedyIngredient;
    }
    async update(remedyId, ingredientId, updateRemedyIngredientDto) {
        const remedyIngredient = await this.prisma.remedyIngredient.findUnique({
            where: { remedyId_ingredientId: { remedyId, ingredientId } },
        });
        if (!remedyIngredient) {
            throw new common_1.NotFoundException('La relation remède-ingrédient spécifiée est introuvable.');
        }
        if (remedyIngredient.deleted) {
            throw new common_1.BadRequestException('Impossible de mettre à jour une relation supprimée.');
        }
        try {
            return await this.prisma.remedyIngredient.update({
                where: { remedyId_ingredientId: { remedyId, ingredientId } },
                data: updateRemedyIngredientDto,
            });
        }
        catch (error) {
            throw new common_1.BadRequestException('Erreur lors de la mise à jour de la relation.');
        }
    }
    async remove(remedyId, ingredientId) {
        const remedyIngredient = await this.prisma.remedyIngredient.findUnique({
            where: { remedyId_ingredientId: { remedyId, ingredientId } },
        });
        if (!remedyIngredient) {
            throw new common_1.NotFoundException('La relation remède-ingrédient spécifiée est introuvable.');
        }
        if (remedyIngredient.deleted) {
            throw new common_1.BadRequestException('Cette relation est déjà supprimée.');
        }
        try {
            return await this.prisma.remedyIngredient.update({
                where: { remedyId_ingredientId: { remedyId, ingredientId } },
                data: { deleted: true },
            });
        }
        catch (error) {
            throw new common_1.BadRequestException('Erreur lors de la suppression de la relation.');
        }
    }
};
exports.RemedyIngredientService = RemedyIngredientService;
exports.RemedyIngredientService = RemedyIngredientService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], RemedyIngredientService);
//# sourceMappingURL=remedy-ingredient.service.js.map