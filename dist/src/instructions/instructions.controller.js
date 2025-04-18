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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InstructionController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const instructions_dto_1 = require("./dto/instructions.dto");
const instructions_service_1 = require("./instructions.service");
const swagger_1 = require("@nestjs/swagger");
const common_2 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
let InstructionController = class InstructionController {
    constructor(instructionService) {
        this.instructionService = instructionService;
    }
    async create(createInstructionDto) {
        try {
            return await this.instructionService.create(createInstructionDto);
        }
        catch (error) {
            throw new common_1.BadRequestException('Erreur lors de la création de l\'instruction.');
        }
    }
    async findAll(remedyId) {
        try {
            return await this.instructionService.findAll(remedyId);
        }
        catch (error) {
            throw new common_1.BadRequestException('Erreur lors de la récupération des instructions.');
        }
    }
    async findOne(id) {
        try {
            return await this.instructionService.findOne(id);
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw new common_1.NotFoundException('Instruction non trouvée.');
            }
            throw new common_1.BadRequestException('Erreur lors de la récupération de l\'instruction.');
        }
    }
    async update(id, updateInstructionDto) {
        try {
            return await this.instructionService.update(id, updateInstructionDto);
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw new common_1.NotFoundException('Instruction non trouvée.');
            }
            throw new common_1.BadRequestException('Erreur lors de la mise à jour de l\'instruction.');
        }
    }
    async remove(id) {
        try {
            return await this.instructionService.remove(id);
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw new common_1.NotFoundException('Instruction non trouvée.');
            }
            throw new common_1.BadRequestException('Erreur lors de la suppression de l\'instruction.');
        }
    }
};
exports.InstructionController = InstructionController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Créer une nouvelle instruction' }),
    (0, swagger_1.ApiBody)({ type: instructions_dto_1.CreateInstructionDto }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Instruction créée avec succès.' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Erreur lors de la création de l\'instruction.' }),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [instructions_dto_1.CreateInstructionDto]),
    __metadata("design:returntype", Promise)
], InstructionController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('remedy/:remedyId'),
    (0, swagger_1.ApiOperation)({ summary: 'Récupérer toutes les instructions d\'un remède par ID' }),
    (0, swagger_1.ApiParam)({ name: 'remedyId', description: 'L\'ID du remède pour lequel récupérer les instructions' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Instructions récupérées avec succès.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Remède non trouvé.' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Erreur lors de la récupération des instructions.' }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('remedyId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], InstructionController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Récupérer une instruction par ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'L\'ID de l\'instruction à récupérer' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Instruction récupérée avec succès.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Instruction non trouvée.' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Erreur lors de la récupération de l\'instruction.' }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], InstructionController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Mettre à jour une instruction par ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'L\'ID de l\'instruction à mettre à jour' }),
    (0, swagger_1.ApiBody)({ type: instructions_dto_1.UpdateInstructionDto }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Instruction mise à jour avec succès.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Instruction non trouvée.' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Erreur lors de la mise à jour de l\'instruction.' }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, instructions_dto_1.UpdateInstructionDto]),
    __metadata("design:returntype", Promise)
], InstructionController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Supprimer une instruction par ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'L\'ID de l\'instruction à supprimer' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Instruction supprimée avec succès.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Instruction non trouvée.' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Erreur lors de la suppression de l\'instruction.' }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], InstructionController.prototype, "remove", null);
exports.InstructionController = InstructionController = __decorate([
    (0, common_2.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, swagger_1.ApiTags)('Instructions'),
    (0, common_1.Controller)('instructions'),
    __metadata("design:paramtypes", [instructions_service_1.InstructionService])
], InstructionController);
//# sourceMappingURL=instructions.controller.js.map