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
exports.CreateRemedyDto = void 0;
const openapi = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const ingredient_dto_1 = require("../../ingredients/dto/ingredient.dto");
const instructions_dto_1 = require("../../instructions/dto/instructions.dto");
class CreateRemedyDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { name: { required: true, type: () => String }, value: { required: true, type: () => Number }, description: { required: false, type: () => String }, ingredientIds: { required: false, type: () => [String] }, diseaseIds: { required: false, type: () => [String] }, newIngredients: { required: false, type: () => [require("../../ingredients/dto/ingredient.dto").CreateIngredientDto] }, instructions: { required: false, type: () => [require("../../instructions/dto/instructions.dto").CreateInstructionDto] }, newInstructions: { required: false, type: () => [require("../../instructions/dto/instructions.dto").CreateInstructionDto] } };
    }
}
exports.CreateRemedyDto = CreateRemedyDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'Le nom du remède est requis.' }),
    __metadata("design:type", String)
], CreateRemedyDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'La valeur du remède est requise.' }),
    __metadata("design:type", Number)
], CreateRemedyDto.prototype, "value", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateRemedyDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], CreateRemedyDto.prototype, "ingredientIds", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], CreateRemedyDto.prototype, "diseaseIds", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => ingredient_dto_1.CreateIngredientDto),
    __metadata("design:type", Array)
], CreateRemedyDto.prototype, "newIngredients", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => instructions_dto_1.CreateInstructionDto),
    __metadata("design:type", Array)
], CreateRemedyDto.prototype, "instructions", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => instructions_dto_1.CreateInstructionDto),
    __metadata("design:type", Array)
], CreateRemedyDto.prototype, "newInstructions", void 0);
//# sourceMappingURL=remedy.dto.js.map