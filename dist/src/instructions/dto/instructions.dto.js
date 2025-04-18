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
exports.UpdateInstructionDto = exports.CreateInstructionDto = void 0;
const openapi = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateInstructionDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { stepNumber: { required: true, type: () => Number, minimum: 1 }, text: { required: true, type: () => String }, remedyId: { required: true, type: () => String } };
    }
}
exports.CreateInstructionDto = CreateInstructionDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Le numéro de l\'étape est requis.' }),
    (0, class_validator_1.IsInt)({ message: 'Le numéro de l\'étape doit être un nombre entier.' }),
    (0, class_validator_1.Min)(1, { message: 'Le numéro de l\'étape doit être au moins 1.' }),
    __metadata("design:type", Number)
], CreateInstructionDto.prototype, "stepNumber", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Le texte de l\'instruction est requis.' }),
    (0, class_validator_1.IsString)({ message: 'Le texte de l\'instruction doit être une chaîne de caractères.' }),
    __metadata("design:type", String)
], CreateInstructionDto.prototype, "text", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'L\'ID du remède est requis.' }),
    (0, class_validator_1.IsUUID)('4', { message: 'L\'ID du remède doit être un UUID valide.' }),
    __metadata("design:type", String)
], CreateInstructionDto.prototype, "remedyId", void 0);
class UpdateInstructionDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { stepNumber: { required: false, type: () => Number, minimum: 1 }, text: { required: false, type: () => String }, remedyId: { required: false, type: () => String } };
    }
}
exports.UpdateInstructionDto = UpdateInstructionDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)({ message: 'Le numéro de l\'étape doit être un nombre entier.' }),
    (0, class_validator_1.Min)(1, { message: 'Le numéro de l\'étape doit être au moins 1.' }),
    __metadata("design:type", Number)
], UpdateInstructionDto.prototype, "stepNumber", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'Le texte de l\'instruction doit être une chaîne de caractères.' }),
    __metadata("design:type", String)
], UpdateInstructionDto.prototype, "text", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)('4', { message: 'L\'ID du remède doit être un UUID valide.' }),
    __metadata("design:type", String)
], UpdateInstructionDto.prototype, "remedyId", void 0);
//# sourceMappingURL=instructions.dto.js.map