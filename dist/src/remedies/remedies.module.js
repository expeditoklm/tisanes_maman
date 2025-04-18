"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RemediesModule = void 0;
const common_1 = require("@nestjs/common");
const remedies_service_1 = require("./remedies.service");
const remedies_controller_1 = require("./remedies.controller");
const ingredients_service_1 = require("../ingredients/ingredients.service");
let RemediesModule = class RemediesModule {
};
exports.RemediesModule = RemediesModule;
exports.RemediesModule = RemediesModule = __decorate([
    (0, common_1.Module)({
        providers: [remedies_service_1.RemedyService, ingredients_service_1.IngredientService],
        controllers: [remedies_controller_1.RemedyController]
    })
], RemediesModule);
//# sourceMappingURL=remedies.module.js.map