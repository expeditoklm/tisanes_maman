export declare class CreateRemedyIngredientDto {
    remedyId: string;
    ingredientId: string;
    quantity: string;
    unit: string;
}
export declare class UpdateRemedyIngredientDto {
    quantity?: string;
    unit?: string;
    deleted?: boolean;
}
