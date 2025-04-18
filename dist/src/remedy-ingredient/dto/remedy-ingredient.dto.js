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
exports.UpdateRemedyIngredientDto = exports.CreateRemedyIngredientDto = void 0;
const openapi = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateRemedyIngredientDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { remedyId: { required: true, type: () => String }, ingredientId: { required: true, type: () => String }, quantity: { required: true, type: () => String }, unit: { required: true, type: () => String } };
    }
}
exports.CreateRemedyIngredientDto = CreateRemedyIngredientDto;
__decorate([
    (0, class_validator_1.IsUUID)('4', { message: 'L\'ID du remède fourni est invalide.' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'L\'ID du remède est obligatoire.' }),
    __metadata("design:type", String)
], CreateRemedyIngredientDto.prototype, "remedyId", void 0);
__decorate([
    (0, class_validator_1.IsUUID)('4', { message: 'L\'ID de l\'ingrédient fourni est invalide.' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'L\'ID de l\'ingrédient est obligatoire.' }),
    __metadata("design:type", String)
], CreateRemedyIngredientDto.prototype, "ingredientId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)({ message: 'La quantité est obligatoire.' }),
    __metadata("design:type", String)
], CreateRemedyIngredientDto.prototype, "quantity", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)({ message: 'L\'unité est obligatoire.' }),
    __metadata("design:type", String)
], CreateRemedyIngredientDto.prototype, "unit", void 0);
class UpdateRemedyIngredientDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { quantity: { required: false, type: () => String }, unit: { required: false, type: () => String }, deleted: { required: false, type: () => Boolean } };
    }
}
exports.UpdateRemedyIngredientDto = UpdateRemedyIngredientDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateRemedyIngredientDto.prototype, "quantity", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateRemedyIngredientDto.prototype, "unit", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], UpdateRemedyIngredientDto.prototype, "deleted", void 0);
//# sourceMappingURL=remedy-ingredient.dto.js.map