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
exports.DiseaseService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let DiseaseService = class DiseaseService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createDiseaseDto) {
        const { name } = createDiseaseDto;
        if (!name) {
            throw new common_1.BadRequestException('Le nom de la maladie est requis pour créer une nouvelle maladie.');
        }
        try {
            const disease = await this.prisma.disease.create({
                data: {
                    ...createDiseaseDto,
                },
            });
            return disease;
        }
        catch (error) {
            throw new common_1.BadRequestException('Erreur lors de la création de la maladie. Veuillez réessayer.');
        }
    }
    async findAll() {
        try {
            return await this.prisma.disease.findMany({
                where: {
                    deleted: false,
                },
            });
        }
        catch (error) {
            throw new common_1.BadRequestException('Erreur lors de la récupération des maladies.');
        }
    }
    async findOne(id) {
        try {
            const disease = await this.prisma.disease.findUnique({
                where: { id },
            });
            if (!disease || disease.deleted) {
                throw new common_1.NotFoundException('La maladie demandée n’existe pas ou a été supprimée.');
            }
            return disease;
        }
        catch (error) {
            throw new common_1.BadRequestException('Erreur lors de la récupération de la maladie. Veuillez vérifier l’ID.');
        }
    }
    async update(id, updateDiseaseDto) {
        const disease = await this.prisma.disease.findUnique({
            where: { id },
        });
        if (!disease || disease.deleted) {
            throw new common_1.NotFoundException('La maladie que vous essayez de mettre à jour n’existe pas ou a été supprimée.');
        }
        try {
            return await this.prisma.disease.update({
                where: { id },
                data: {
                    ...updateDiseaseDto,
                },
            });
        }
        catch (error) {
            throw new common_1.BadRequestException('Erreur lors de la mise à jour de la maladie. Veuillez réessayer.');
        }
    }
    async remove(id) {
        const disease = await this.prisma.disease.findUnique({
            where: { id },
        });
        if (!disease || disease.deleted) {
            throw new common_1.NotFoundException('La maladie que vous essayez de supprimer n’existe pas ou a déjà été supprimée.');
        }
        try {
            await this.prisma.disease.update({
                where: { id },
                data: { deleted: true },
            });
            return { message: 'Maladie supprimée avec succès.' };
        }
        catch (error) {
            throw new common_1.BadRequestException('Erreur lors de la suppression de la maladie.');
        }
    }
};
exports.DiseaseService = DiseaseService;
exports.DiseaseService = DiseaseService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], DiseaseService);
//# sourceMappingURL=diseases.service.js.map