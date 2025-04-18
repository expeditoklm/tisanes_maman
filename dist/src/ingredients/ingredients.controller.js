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
exports.IngredientController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const ingredients_service_1 = require("./ingredients.service");
const ingredient_dto_1 = require("./dto/ingredient.dto");
const swagger_1 = require("@nestjs/swagger");
const common_2 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
let IngredientController = class IngredientController {
    constructor(ingredientService) {
        this.ingredientService = ingredientService;
    }
    async create(createIngredientDto) {
        try {
            return await this.ingredientService.create(createIngredientDto);
        }
        catch (error) {
            throw new common_1.BadRequestException('Erreur lors de la création de l\'ingrédient.');
        }
    }
    async findAll() {
        try {
            return await this.ingredientService.findAll();
        }
        catch (error) {
            throw new common_1.BadRequestException('Erreur lors de la récupération des ingrédients.');
        }
    }
    async findOne(id) {
        try {
            return await this.ingredientService.findOne(id);
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw new common_1.NotFoundException('Ingrédient non trouvé.');
            }
            throw new common_1.BadRequestException('Erreur lors de la récupération de l\'ingrédient.');
        }
    }
    async update(id, updateIngredientDto) {
        try {
            return await this.ingredientService.update(id, updateIngredientDto);
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw new common_1.NotFoundException('Ingrédient non trouvé.');
            }
            throw new common_1.BadRequestException('Erreur lors de la mise à jour de l\'ingrédient.');
        }
    }
    async remove(id) {
        try {
            return await this.ingredientService.remove(id);
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw new common_1.NotFoundException('Ingrédient non trouvé.');
            }
            throw new common_1.BadRequestException('Erreur lors de la suppression de l\'ingrédient.');
        }
    }
};
exports.IngredientController = IngredientController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Créer un nouvel ingrédient' }),
    (0, swagger_1.ApiBody)({ type: ingredient_dto_1.CreateIngredientDto }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Ingrédient créé avec succès.' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Erreur lors de la création de l\'ingrédient.' }),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ingredient_dto_1.CreateIngredientDto]),
    __metadata("design:returntype", Promise)
], IngredientController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Récupérer tous les ingrédients' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Liste des ingrédients récupérée avec succès.' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Erreur lors de la récupération des ingrédients.' }),
    openapi.ApiResponse({ status: 200, type: [Object] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], IngredientController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Récupérer un ingrédient par ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'L\'ID de l\'ingrédient à récupérer' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Ingrédient récupéré avec succès.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Ingrédient non trouvé.' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Erreur lors de la récupération de l\'ingrédient.' }),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], IngredientController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Mettre à jour un ingrédient par ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'L\'ID de l\'ingrédient à mettre à jour' }),
    (0, swagger_1.ApiBody)({ type: ingredient_dto_1.UpdateIngredientDto }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Ingrédient mis à jour avec succès.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Ingrédient non trouvé.' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Erreur lors de la mise à jour de l\'ingrédient.' }),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, ingredient_dto_1.UpdateIngredientDto]),
    __metadata("design:returntype", Promise)
], IngredientController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Supprimer un ingrédient par ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'L\'ID de l\'ingrédient à supprimer' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Ingrédient supprimé avec succès.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Ingrédient non trouvé.' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Erreur lors de la suppression de l\'ingrédient.' }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], IngredientController.prototype, "remove", null);
exports.IngredientController = IngredientController = __decorate([
    (0, common_2.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, swagger_1.ApiTags)('Ingrédients'),
    (0, common_1.Controller)('ingredients'),
    __metadata("design:paramtypes", [ingredients_service_1.IngredientService])
], IngredientController);
//# sourceMappingURL=ingredients.controller.js.map