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
exports.RemedyDiseaseService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let RemedyDiseaseService = class RemedyDiseaseService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createRemedyDiseaseDto) {
        const { remedyId, diseaseId } = createRemedyDiseaseDto;
        if (!remedyId || !diseaseId) {
            throw new common_1.BadRequestException('Les IDs de la maladie et du remède sont requis.');
        }
        const remedy = await this.prisma.remedy.findUnique({ where: { id: remedyId } });
        const disease = await this.prisma.disease.findUnique({ where: { id: diseaseId } });
        if (!remedy || remedy.deleted) {
            throw new common_1.NotFoundException('Le remède spécifié n’existe pas ou a été supprimé.');
        }
        if (!disease || disease.deleted) {
            throw new common_1.NotFoundException('La maladie spécifiée n’existe pas ou a été supprimée.');
        }
        try {
            return await this.prisma.remedyDisease.create({
                data: {
                    remedyId,
                    diseaseId,
                },
            });
        }
        catch (error) {
            throw new common_1.BadRequestException('Erreur lors de l\'association du remède à la maladie.');
        }
    }
    async findAll() {
        try {
            return await this.prisma.remedyDisease.findMany({
                where: { deleted: false },
            });
        }
        catch (error) {
            throw new common_1.BadRequestException('Erreur lors de la récupération des associations.');
        }
    }
    async findOne(remedyId, diseaseId) {
        if (!remedyId || !diseaseId) {
            throw new common_1.BadRequestException('Les IDs du remède et de la maladie sont requis pour la recherche.');
        }
        try {
            const remedyDisease = await this.prisma.remedyDisease.findUnique({
                where: {
                    remedyId_diseaseId: { remedyId, diseaseId },
                },
            });
            if (!remedyDisease || remedyDisease.deleted) {
                throw new common_1.NotFoundException('L\'association remède-maladie demandée n\'existe pas ou a été supprimée.');
            }
            return remedyDisease;
        }
        catch (error) {
            throw new common_1.BadRequestException('Erreur lors de la récupération de l\'association remède-maladie.');
        }
    }
    async update(remedyId, diseaseId, updateRemedyDiseaseDto) {
        const existing = await this.prisma.remedyDisease.findUnique({
            where: { remedyId_diseaseId: { remedyId, diseaseId } },
        });
        if (!existing || existing.deleted) {
            throw new common_1.NotFoundException('L\'association que vous essayez de mettre à jour n\'existe pas ou a été supprimée.');
        }
        if (updateRemedyDiseaseDto.remedyId) {
            const remedy = await this.prisma.remedy.findUnique({ where: { id: updateRemedyDiseaseDto.remedyId } });
            if (!remedy || remedy.deleted) {
                throw new common_1.NotFoundException('Le nouveau remède spécifié n\'existe pas ou a été supprimé.');
            }
        }
        if (updateRemedyDiseaseDto.diseaseId) {
            const disease = await this.prisma.disease.findUnique({ where: { id: updateRemedyDiseaseDto.diseaseId } });
            if (!disease || disease.deleted) {
                throw new common_1.NotFoundException('La nouvelle maladie spécifiée n\'existe pas ou a été supprimée.');
            }
        }
        try {
            return await this.prisma.remedyDisease.update({
                where: { remedyId_diseaseId: { remedyId, diseaseId } },
                data: { ...updateRemedyDiseaseDto },
            });
        }
        catch (error) {
            throw new common_1.BadRequestException('Erreur lors de la mise à jour de l\'association remède-maladie.');
        }
    }
    async remove(remedyId, diseaseId) {
        const existing = await this.prisma.remedyDisease.findUnique({
            where: { remedyId_diseaseId: { remedyId, diseaseId } },
        });
        if (!existing || existing.deleted) {
            throw new common_1.NotFoundException('L\'association que vous essayez de supprimer n\'existe pas ou a déjà été supprimée.');
        }
        try {
            await this.prisma.remedyDisease.update({
                where: { remedyId_diseaseId: { remedyId, diseaseId } },
                data: { deleted: true },
            });
            return { message: 'Association remède-maladie supprimée avec succès.' };
        }
        catch (error) {
            throw new common_1.BadRequestException('Erreur lors de la suppression de l\'association remède-maladie.');
        }
    }
};
exports.RemedyDiseaseService = RemedyDiseaseService;
exports.RemedyDiseaseService = RemedyDiseaseService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], RemedyDiseaseService);
//# sourceMappingURL=remedy-disease.service.js.map