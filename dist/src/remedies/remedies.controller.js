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
exports.RemedyController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const remedies_service_1 = require("./remedies.service");
const swagger_1 = require("@nestjs/swagger");
const common_2 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const remedy_dto_1 = require("./dto/remedy.dto");
let RemedyController = class RemedyController {
    constructor(remedyService) {
        this.remedyService = remedyService;
    }
    async create(createRemedyDto) {
        return await this.remedyService.create(createRemedyDto);
    }
    async findAll() {
        try {
            return await this.remedyService.findAll();
        }
        catch (error) {
            throw new common_1.BadRequestException('Erreur lors de la récupération des remèdes.');
        }
    }
    async findOne(id) {
        try {
            return await this.remedyService.findOne(id);
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw new common_1.NotFoundException('Remède non trouvé.');
            }
            throw new common_1.BadRequestException('Erreur lors de la récupération du remède.');
        }
    }
    async update(id, updateRemedyDto) {
        return await this.remedyService.update(id, updateRemedyDto);
    }
    async delete(id) {
        return await this.remedyService.delete(id);
    }
};
exports.RemedyController = RemedyController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Créer un nouveau remède' }),
    (0, swagger_1.ApiBody)({ type: remedy_dto_1.CreateRemedyDto }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Remède créé avec succès.' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Erreur lors de la création du remède.' }),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [remedy_dto_1.CreateRemedyDto]),
    __metadata("design:returntype", Promise)
], RemedyController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Récupérer tous les remèdes' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Remèdes récupérés avec succès.' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Erreur lors de la récupération des remèdes.' }),
    openapi.ApiResponse({ status: 200, type: [Object] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RemedyController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Récupérer un remède par ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'L\'ID du remède à récupérer' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Remède récupéré avec succès.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Remède non trouvé.' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Erreur lors de la récupération du remède.' }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RemedyController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Mettre à jour un remède par ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'L\'ID du remède à mettre à jour' }),
    (0, swagger_1.ApiBody)({ type: remedy_dto_1.CreateRemedyDto }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Remède mis à jour avec succès.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Remède non trouvé.' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Erreur lors de la mise à jour du remède.' }),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, remedy_dto_1.CreateRemedyDto]),
    __metadata("design:returntype", Promise)
], RemedyController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Supprimer un remède par ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'L\'ID du remède à supprimer' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Remède supprimé avec succès.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Remède non trouvé.' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Erreur lors de la suppression du remède.' }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RemedyController.prototype, "delete", null);
exports.RemedyController = RemedyController = __decorate([
    (0, common_2.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, swagger_1.ApiTags)('Remèdes'),
    (0, common_1.Controller)('remedies'),
    __metadata("design:paramtypes", [remedies_service_1.RemedyService])
], RemedyController);
//# sourceMappingURL=remedies.controller.js.map