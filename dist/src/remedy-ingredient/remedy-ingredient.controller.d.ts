import { RemedyIngredientService } from './remedy-ingredient.service';
import { CreateRemedyIngredientDto, UpdateRemedyIngredientDto } from './dto/remedy-ingredient.dto';
export declare class RemedyIngredientController {
    private readonly remedyIngredientService;
    constructor(remedyIngredientService: RemedyIngredientService);
    create(createRemedyIngredientDto: CreateRemedyIngredientDto): Promise<{
        createdAt: Date;
        updatedAt: Date;
        deleted: boolean;
        ingredientId: string;
        remedyId: string;
        quantity: string | null;
    }>;
    findAll(): Promise<({
        ingredient: {
            name: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            deleted: boolean;
            description: string | null;
        };
        remedy: {
            name: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            deleted: boolean;
            description: string | null;
            value: number;
        };
    } & {
        createdAt: Date;
        updatedAt: Date;
        deleted: boolean;
        ingredientId: string;
        remedyId: string;
        quantity: string | null;
    })[]>;
    findOne(remedyId: string, ingredientId: string): Promise<{
        ingredient: {
            name: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            deleted: boolean;
            description: string | null;
        };
        remedy: {
            name: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            deleted: boolean;
            description: string | null;
            value: number;
        };
    } & {
        createdAt: Date;
        updatedAt: Date;
        deleted: boolean;
        ingredientId: string;
        remedyId: string;
        quantity: string | null;
    }>;
    update(remedyId: string, ingredientId: string, updateRemedyIngredientDto: UpdateRemedyIngredientDto): Promise<{
        createdAt: Date;
        updatedAt: Date;
        deleted: boolean;
        ingredientId: string;
        remedyId: string;
        quantity: string | null;
    }>;
    remove(remedyId: string, ingredientId: string): Promise<{
        createdAt: Date;
        updatedAt: Date;
        deleted: boolean;
        ingredientId: string;
        remedyId: string;
        quantity: string | null;
    }>;
}
