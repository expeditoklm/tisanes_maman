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
exports.RemedyDiseaseController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const remedy_disease_service_1 = require("./remedy-disease.service");
const remedy_disease_dto_1 = require("./dto/remedy-disease.dto");
const swagger_1 = require("@nestjs/swagger");
const common_2 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
let RemedyDiseaseController = class RemedyDiseaseController {
    constructor(remedyDiseaseService) {
        this.remedyDiseaseService = remedyDiseaseService;
    }
    async create(createRemedyDiseaseDto) {
        try {
            return await this.remedyDiseaseService.create(createRemedyDiseaseDto);
        }
        catch (error) {
            throw new common_1.BadRequestException('Erreur lors de la création de l\'association.');
        }
    }
    async findAll() {
        try {
            return await this.remedyDiseaseService.findAll();
        }
        catch (error) {
            throw new common_1.BadRequestException('Erreur lors de la récupération des associations.');
        }
    }
    async findOne(remedyId, diseaseId) {
        try {
            return await this.remedyDiseaseService.findOne(remedyId, diseaseId);
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw new common_1.NotFoundException('Association non trouvée.');
            }
            throw new common_1.BadRequestException('Erreur lors de la récupération de l\'association.');
        }
    }
    async update(remedyId, diseaseId, updateRemedyDiseaseDto) {
        try {
            return await this.remedyDiseaseService.update(remedyId, diseaseId, updateRemedyDiseaseDto);
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw new common_1.NotFoundException('Association non trouvée.');
            }
            throw new common_1.BadRequestException('Erreur lors de la mise à jour de l\'association.');
        }
    }
    async remove(remedyId, diseaseId) {
        try {
            return await this.remedyDiseaseService.remove(remedyId, diseaseId);
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw new common_1.NotFoundException('Association non trouvée.');
            }
            throw new common_1.BadRequestException('Erreur lors de la suppression de l\'association.');
        }
    }
};
exports.RemedyDiseaseController = RemedyDiseaseController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Créer une nouvelle association remède-maladie' }),
    (0, swagger_1.ApiBody)({ type: remedy_disease_dto_1.CreateRemedyDiseaseDto }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Association créée avec succès.' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Erreur lors de la création de l\'association.' }),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [remedy_disease_dto_1.CreateRemedyDiseaseDto]),
    __metadata("design:returntype", Promise)
], RemedyDiseaseController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Récupérer toutes les associations remède-maladie' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Associations récupérées avec succès.' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Erreur lors de la récupération des associations.' }),
    openapi.ApiResponse({ status: 200 }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RemedyDiseaseController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':remedyId/:diseaseId'),
    (0, swagger_1.ApiOperation)({ summary: 'Récupérer une association remède-maladie par ID' }),
    (0, swagger_1.ApiParam)({ name: 'remedyId', description: 'L\'ID du remède' }),
    (0, swagger_1.ApiParam)({ name: 'diseaseId', description: 'L\'ID de la maladie' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Association récupérée avec succès.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Association non trouvée.' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Erreur lors de la récupération de l\'association.' }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('remedyId')),
    __param(1, (0, common_1.Param)('diseaseId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], RemedyDiseaseController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':remedyId/:diseaseId'),
    (0, swagger_1.ApiOperation)({ summary: 'Mettre à jour une association remède-maladie par ID' }),
    (0, swagger_1.ApiParam)({ name: 'remedyId', description: 'L\'ID du remède' }),
    (0, swagger_1.ApiParam)({ name: 'diseaseId', description: 'L\'ID de la maladie' }),
    (0, swagger_1.ApiBody)({ type: remedy_disease_dto_1.UpdateRemedyDiseaseDto }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Association mise à jour avec succès.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Association non trouvée.' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Erreur lors de la mise à jour de l\'association.' }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('remedyId')),
    __param(1, (0, common_1.Param)('diseaseId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, remedy_disease_dto_1.UpdateRemedyDiseaseDto]),
    __metadata("design:returntype", Promise)
], RemedyDiseaseController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':remedyId/:diseaseId'),
    (0, swagger_1.ApiOperation)({ summary: 'Supprimer une association remède-maladie par ID' }),
    (0, swagger_1.ApiParam)({ name: 'remedyId', description: 'L\'ID du remède' }),
    (0, swagger_1.ApiParam)({ name: 'diseaseId', description: 'L\'ID de la maladie' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Association supprimée avec succès.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Association non trouvée.' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Erreur lors de la suppression de l\'association.' }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('remedyId')),
    __param(1, (0, common_1.Param)('diseaseId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], RemedyDiseaseController.prototype, "remove", null);
exports.RemedyDiseaseController = RemedyDiseaseController = __decorate([
    (0, common_2.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, swagger_1.ApiTags)('Remèdes - Maladies'),
    (0, common_1.Controller)('remedy-diseases'),
    __metadata("design:paramtypes", [remedy_disease_service_1.RemedyDiseaseService])
], RemedyDiseaseController);
//# sourceMappingURL=remedy-disease.controller.js.map