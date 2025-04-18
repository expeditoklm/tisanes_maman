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
exports.InstructionService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let InstructionService = class InstructionService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createInstructionDto) {
        const { stepNumber, text, remedyId } = createInstructionDto;
        const remedy = await this.prisma.remedy.findUnique({ where: { id: remedyId } });
        if (!remedy || remedy.deleted) {
            throw new common_1.NotFoundException('Le remède spécifié n\'existe pas ou a été supprimé.');
        }
        try {
            return await this.prisma.instruction.create({
                data: {
                    stepNumber,
                    text,
                    remedyId,
                },
            });
        }
        catch (error) {
            throw new common_1.BadRequestException('Erreur lors de la création de l\'instruction.');
        }
    }
    async findAll(remedyId) {
        const remedy = await this.prisma.remedy.findUnique({ where: { id: remedyId } });
        if (!remedy || remedy.deleted) {
            throw new common_1.NotFoundException('Le remède spécifié n\'existe pas ou a été supprimé.');
        }
        try {
            return await this.prisma.instruction.findMany({
                where: { remedyId, deleted: false },
                orderBy: { stepNumber: 'asc' },
            });
        }
        catch (error) {
            throw new common_1.BadRequestException('Erreur lors de la récupération des instructions.');
        }
    }
    async findOne(id) {
        const instruction = await this.prisma.instruction.findUnique({ where: { id } });
        if (!instruction || instruction.deleted) {
            throw new common_1.NotFoundException('L\'instruction spécifiée n\'existe pas ou a été supprimée.');
        }
        return instruction;
    }
    async update(id, updateInstructionDto) {
        const instruction = await this.prisma.instruction.findUnique({
            where: { id },
        });
        if (!instruction || instruction.deleted) {
            throw new common_1.NotFoundException('L\'instruction que vous essayez de mettre à jour n\'existe pas ou a été supprimée.');
        }
        if (updateInstructionDto.remedyId) {
            const remedy = await this.prisma.remedy.findUnique({ where: { id: updateInstructionDto.remedyId } });
            if (!remedy || remedy.deleted) {
                throw new common_1.NotFoundException('Le remède spécifié n\'existe pas ou a été supprimé.');
            }
        }
        try {
            return await this.prisma.instruction.update({
                where: { id },
                data: { ...updateInstructionDto },
            });
        }
        catch (error) {
            throw new common_1.BadRequestException('Erreur lors de la mise à jour de l\'instruction.');
        }
    }
    async remove(id) {
        const instruction = await this.prisma.instruction.findUnique({
            where: { id },
        });
        if (!instruction || instruction.deleted) {
            throw new common_1.NotFoundException('L\'instruction que vous essayez de supprimer n\'existe pas ou a déjà été supprimée.');
        }
        try {
            await this.prisma.instruction.update({
                where: { id },
                data: { deleted: true },
            });
            return { message: 'Instruction supprimée avec succès.' };
        }
        catch (error) {
            throw new common_1.BadRequestException('Erreur lors de la suppression de l\'instruction.');
        }
    }
};
exports.InstructionService = InstructionService;
exports.InstructionService = InstructionService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], InstructionService);
//# sourceMappingURL=instructions.service.js.map