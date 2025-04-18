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
exports.UpdateDiseaseDto = exports.CreateDiseaseDto = void 0;
const openapi = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateDiseaseDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { name: { required: true, type: () => String }, categoryId: { required: true, type: () => String }, description: { required: true, type: () => String } };
    }
}
exports.CreateDiseaseDto = CreateDiseaseDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'Le nom de la maladie est requis.' }),
    __metadata("design:type", String)
], CreateDiseaseDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'L\'ID de la categorie est requis.' }),
    (0, class_validator_1.IsUUID)('4', { message: 'L\'ID  de la categorie  doit être un UUID valide.' }),
    __metadata("design:type", String)
], CreateDiseaseDto.prototype, "categoryId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateDiseaseDto.prototype, "description", void 0);
class UpdateDiseaseDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { name: { required: false, type: () => String }, categoryId: { required: true, type: () => String }, description: { required: false, type: () => String } };
    }
}
exports.UpdateDiseaseDto = UpdateDiseaseDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateDiseaseDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'L\'ID de la categorie est requis.' }),
    (0, class_validator_1.IsUUID)('4', { message: 'L\'ID  de la categorie  doit être un UUID valide.' }),
    __metadata("design:type", String)
], UpdateDiseaseDto.prototype, "categoryId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateDiseaseDto.prototype, "description", void 0);
//# sourceMappingURL=diseases.dto.js.map