import { IngredientService } from './ingredients.service';
import { CreateIngredientDto, UpdateIngredientDto } from './dto/ingredient.dto';
export declare class IngredientController {
    private readonly ingredientService;
    constructor(ingredientService: IngredientService);
    create(createIngredientDto: CreateIngredientDto): Promise<{
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        deleted: boolean;
        description: string | null;
    }>;
    findAll(): Promise<({
        photos: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            deleted: boolean;
            url: string;
            ingredientId: string;
        }[];
    } & {
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        deleted: boolean;
        description: string | null;
    })[]>;
    findOne(id: string): Promise<{
        photos: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            deleted: boolean;
            url: string;
            ingredientId: string;
        }[];
    } & {
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        deleted: boolean;
        description: string | null;
    }>;
    update(id: string, updateIngredientDto: UpdateIngredientDto): Promise<{
        photos: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            deleted: boolean;
            url: string;
            ingredientId: string;
        }[];
    } & {
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        deleted: boolean;
        description: string | null;
    }>;
    remove(id: string): Promise<{
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        deleted: boolean;
        description: string | null;
    }>;
}
