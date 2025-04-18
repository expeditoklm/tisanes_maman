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
exports.CategoryController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const passport_1 = require("@nestjs/passport");
const categories_service_1 = require("./categories.service");
const categories_dto_1 = require("./dto/categories.dto");
let CategoryController = class CategoryController {
    constructor(categoryService) {
        this.categoryService = categoryService;
    }
    async create(createCategoryDto) {
        try {
            return await this.categoryService.create(createCategoryDto);
        }
        catch (error) {
            throw new common_1.BadRequestException('Erreur lors de la création de la catégorie.');
        }
    }
    async findAll() {
        return await this.categoryService.findAll();
    }
    async findOne(id) {
        return await this.categoryService.findOne(id);
    }
    async update(id, updateCategoryDto) {
        return await this.categoryService.update(id, updateCategoryDto);
    }
    async remove(id) {
        return await this.categoryService.remove(id);
    }
};
exports.CategoryController = CategoryController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Créer une nouvelle catégorie' }),
    (0, swagger_1.ApiBody)({ type: categories_dto_1.CreateCategoryDto }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Catégorie créée avec succès.' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Erreur lors de la création de la catégorie.' }),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [categories_dto_1.CreateCategoryDto]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Récupérer toutes les catégories' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Liste des catégories récupérée avec succès.' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Erreur lors de la récupération des catégories.' }),
    openapi.ApiResponse({ status: 200, type: [Object] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Récupérer une catégorie par ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'L\'ID de la catégorie à récupérer' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Catégorie récupérée avec succès.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Catégorie non trouvée.' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Erreur lors de la récupération de la catégorie.' }),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Mettre à jour une catégorie par ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'L\'ID de la catégorie à mettre à jour' }),
    (0, swagger_1.ApiBody)({ type: categories_dto_1.UpdateCategoryDto }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Catégorie mise à jour avec succès.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Catégorie non trouvée.' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Erreur lors de la mise à jour de la catégorie.' }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, categories_dto_1.UpdateCategoryDto]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Supprimer une catégorie par ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'L\'ID de la catégorie à supprimer' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Catégorie supprimée avec succès.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Catégorie non trouvée.' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Erreur lors de la suppression de la catégorie.' }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "remove", null);
exports.CategoryController = CategoryController = __decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, swagger_1.ApiTags)('Catégories'),
    (0, common_1.Controller)('categories'),
    __metadata("design:paramtypes", [categories_service_1.CategoryService])
], CategoryController);
//# sourceMappingURL=categories.controller.js.map