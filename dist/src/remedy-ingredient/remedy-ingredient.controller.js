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
exports.RemedyIngredientController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const remedy_ingredient_service_1 = require("./remedy-ingredient.service");
const remedy_ingredient_dto_1 = require("./dto/remedy-ingredient.dto");
const swagger_1 = require("@nestjs/swagger");
const common_2 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
let RemedyIngredientController = class RemedyIngredientController {
    constructor(remedyIngredientService) {
        this.remedyIngredientService = remedyIngredientService;
    }
    async create(createRemedyIngredientDto) {
        try {
            return await this.remedyIngredientService.create(createRemedyIngredientDto);
        }
        catch (error) {
            throw new common_1.BadRequestException('Erreur lors de la création de la relation remède-ingrédient.');
        }
    }
    async findAll() {
        try {
            return await this.remedyIngredientService.findAll();
        }
        catch (error) {
            throw new common_1.BadRequestException('Erreur lors de la récupération des relations remède-ingrédient.');
        }
    }
    async findOne(remedyId, ingredientId) {
        try {
            return await this.remedyIngredientService.findOne(remedyId, ingredientId);
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw new common_1.NotFoundException('Relation non trouvée.');
            }
            throw new common_1.BadRequestException('Erreur lors de la récupération de la relation remède-ingrédient.');
        }
    }
    async update(remedyId, ingredientId, updateRemedyIngredientDto) {
        try {
            return await this.remedyIngredientService.update(remedyId, ingredientId, updateRemedyIngredientDto);
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw new common_1.NotFoundException('Relation non trouvée.');
            }
            throw new common_1.BadRequestException('Erreur lors de la mise à jour de la relation remède-ingrédient.');
        }
    }
    async remove(remedyId, ingredientId) {
        try {
            return await this.remedyIngredientService.remove(remedyId, ingredientId);
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw new common_1.NotFoundException('Relation non trouvée.');
            }
            throw new common_1.BadRequestException('Erreur lors de la suppression de la relation remède-ingrédient.');
        }
    }
};
exports.RemedyIngredientController = RemedyIngredientController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Créer une nouvelle relation remède-ingrédient' }),
    (0, swagger_1.ApiBody)({ type: remedy_ingredient_dto_1.CreateRemedyIngredientDto }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Relation créée avec succès.' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Erreur lors de la création de la relation remède-ingrédient.' }),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [remedy_ingredient_dto_1.CreateRemedyIngredientDto]),
    __metadata("design:returntype", Promise)
], RemedyIngredientController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Récupérer toutes les relations remède-ingrédient' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Relations récupérées avec succès.' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Erreur lors de la récupération des relations remède-ingrédient.' }),
    openapi.ApiResponse({ status: 200, type: [Object] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RemedyIngredientController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':remedyId/:ingredientId'),
    (0, swagger_1.ApiOperation)({ summary: 'Récupérer une relation remède-ingrédient par ID' }),
    (0, swagger_1.ApiParam)({ name: 'remedyId', description: 'L\'ID du remède' }),
    (0, swagger_1.ApiParam)({ name: 'ingredientId', description: 'L\'ID de l\'ingrédient' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Relation récupérée avec succès.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Relation non trouvée.' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Erreur lors de la récupération de la relation remède-ingrédient.' }),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Param)('remedyId')),
    __param(1, (0, common_1.Param)('ingredientId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], RemedyIngredientController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':remedyId/:ingredientId'),
    (0, swagger_1.ApiOperation)({ summary: 'Mettre à jour une relation remède-ingrédient par ID' }),
    (0, swagger_1.ApiParam)({ name: 'remedyId', description: 'L\'ID du remède' }),
    (0, swagger_1.ApiParam)({ name: 'ingredientId', description: 'L\'ID de l\'ingrédient' }),
    (0, swagger_1.ApiBody)({ type: remedy_ingredient_dto_1.UpdateRemedyIngredientDto }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Relation mise à jour avec succès.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Relation non trouvée.' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Erreur lors de la mise à jour de la relation remède-ingrédient.' }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('remedyId')),
    __param(1, (0, common_1.Param)('ingredientId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, remedy_ingredient_dto_1.UpdateRemedyIngredientDto]),
    __metadata("design:returntype", Promise)
], RemedyIngredientController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':remedyId/:ingredientId'),
    (0, swagger_1.ApiOperation)({ summary: 'Supprimer une relation remède-ingrédient par ID' }),
    (0, swagger_1.ApiParam)({ name: 'remedyId', description: 'L\'ID du remède' }),
    (0, swagger_1.ApiParam)({ name: 'ingredientId', description: 'L\'ID de l\'ingrédient' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Relation supprimée avec succès.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Relation non trouvée.' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Erreur lors de la suppression de la relation remède-ingrédient.' }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('remedyId')),
    __param(1, (0, common_1.Param)('ingredientId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], RemedyIngredientController.prototype, "remove", null);
exports.RemedyIngredientController = RemedyIngredientController = __decorate([
    (0, common_2.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, swagger_1.ApiTags)('Remèdes - Ingrédients'),
    (0, common_1.Controller)('remedy-ingredients'),
    __metadata("design:paramtypes", [remedy_ingredient_service_1.RemedyIngredientService])
], RemedyIngredientController);
//# sourceMappingURL=remedy-ingredient.controller.js.map