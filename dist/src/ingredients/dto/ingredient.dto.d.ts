export declare class CreateIngredientDto {
    name?: string;
    description?: string;
    imgUrls?: string[];
}
export declare class UpdateIngredientDto {
    name?: string;
    description?: string;
    imgUrls: string[];
    photoIdsToDelete?: string[];
}
