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
exports.DiseaseController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const diseases_service_1 = require("./diseases.service");
const diseases_dto_1 = require("./dto/diseases.dto");
const swagger_1 = require("@nestjs/swagger");
const passport_1 = require("@nestjs/passport");
let DiseaseController = class DiseaseController {
    constructor(diseaseService) {
        this.diseaseService = diseaseService;
    }
    async create(createDiseaseDto) {
        try {
            return await this.diseaseService.create(createDiseaseDto);
        }
        catch (error) {
            throw new common_1.BadRequestException('Erreur lors de la création de la maladie.');
        }
    }
    async findAll() {
        try {
            return await this.diseaseService.findAll();
        }
        catch (error) {
            throw new common_1.BadRequestException('Erreur lors de la récupération des maladies.');
        }
    }
    async findOne(id) {
        try {
            return await this.diseaseService.findOne(id);
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw new common_1.NotFoundException(error.message);
            }
            throw new common_1.BadRequestException('Erreur lors de la récupération de la maladie.');
        }
    }
    async update(id, updateDiseaseDto) {
        try {
            return await this.diseaseService.update(id, updateDiseaseDto);
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw new common_1.NotFoundException(error.message);
            }
            throw new common_1.BadRequestException('Erreur lors de la mise à jour de la maladie.');
        }
    }
    async remove(id) {
        try {
            return await this.diseaseService.remove(id);
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw new common_1.NotFoundException(error.message);
            }
            throw new common_1.BadRequestException('Erreur lors de la suppression de la maladie.');
        }
    }
};
exports.DiseaseController = DiseaseController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Créer une nouvelle maladie' }),
    (0, swagger_1.ApiBody)({ type: diseases_dto_1.CreateDiseaseDto }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Maladie créée avec succès.' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Erreur lors de la création de la maladie.' }),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [diseases_dto_1.CreateDiseaseDto]),
    __metadata("design:returntype", Promise)
], DiseaseController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Récupérer toutes les maladies' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Liste des maladies récupérée avec succès.' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Erreur lors de la récupération des maladies.' }),
    openapi.ApiResponse({ status: 200 }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DiseaseController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Récupérer une maladie par ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'L\'ID de la maladie à récupérer' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Maladie récupérée avec succès.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Maladie non trouvée.' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Erreur lors de la récupération de la maladie.' }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DiseaseController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Mettre à jour une maladie par ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'L\'ID de la maladie à mettre à jour' }),
    (0, swagger_1.ApiBody)({ type: diseases_dto_1.UpdateDiseaseDto }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Maladie mise à jour avec succès.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Maladie non trouvée.' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Erreur lors de la mise à jour de la maladie.' }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, diseases_dto_1.UpdateDiseaseDto]),
    __metadata("design:returntype", Promise)
], DiseaseController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Supprimer une maladie par ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'L\'ID de la maladie à supprimer' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Maladie supprimée avec succès.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Maladie non trouvée.' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Erreur lors de la suppression de la maladie.' }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DiseaseController.prototype, "remove", null);
exports.DiseaseController = DiseaseController = __decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, swagger_1.ApiTags)('Maladies'),
    (0, common_1.Controller)('diseases'),
    __metadata("design:paramtypes", [diseases_service_1.DiseaseService])
], DiseaseController);
//# sourceMappingURL=diseases.controller.js.map