import { PrismaService } from 'src/prisma/prisma.service';
import { CreateRemedyDto } from './dto/remedy.dto';
import { IngredientService } from 'src/ingredients/ingredients.service';
export declare class RemedyService {
    private prisma;
    private ingredientService;
    constructor(prisma: PrismaService, ingredientService: IngredientService);
    create(createRemedyDto: CreateRemedyDto): Promise<{
        diseases: ({
            disease: {
                name: string;
                id: string;
                createdAt: Date;
                updatedAt: Date;
                deleted: boolean;
                description: string | null;
                categoryId: string | null;
            };
        } & {
            createdAt: Date;
            updatedAt: Date;
            deleted: boolean;
            remedyId: string;
            diseaseId: string;
        })[];
        instructions: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            deleted: boolean;
            stepNumber: number;
            text: string;
            remedyId: string;
        }[];
        ingredients: ({
            ingredient: {
                name: string;
                id: string;
                createdAt: Date;
                updatedAt: Date;
                deleted: boolean;
                description: string | null;
            };
        } & {
            createdAt: Date;
            updatedAt: Date;
            deleted: boolean;
            ingredientId: string;
            remedyId: string;
            quantity: string | null;
        })[];
    } & {
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        deleted: boolean;
        description: string | null;
        value: number;
    }>;
    findAll(): Promise<({
        diseases: ({
            disease: {
                name: string;
                id: string;
                createdAt: Date;
                updatedAt: Date;
                deleted: boolean;
                description: string | null;
                categoryId: string | null;
            };
        } & {
            createdAt: Date;
            updatedAt: Date;
            deleted: boolean;
            remedyId: string;
            diseaseId: string;
        })[];
        instructions: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            deleted: boolean;
            stepNumber: number;
            text: string;
            remedyId: string;
        }[];
        ingredients: ({
            ingredient: {
                name: string;
                id: string;
                createdAt: Date;
                updatedAt: Date;
                deleted: boolean;
                description: string | null;
            };
        } & {
            createdAt: Date;
            updatedAt: Date;
            deleted: boolean;
            ingredientId: string;
            remedyId: string;
            quantity: string | null;
        })[];
    } & {
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        deleted: boolean;
        description: string | null;
        value: number;
    })[]>;
    findOne(id: string): Promise<{
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        deleted: boolean;
        description: string | null;
        value: number;
    }>;
    update(id: string, updateRemedyDto: CreateRemedyDto): Promise<{
        diseases: ({
            disease: {
                name: string;
                id: string;
                createdAt: Date;
                updatedAt: Date;
                deleted: boolean;
                description: string | null;
                categoryId: string | null;
            };
        } & {
            createdAt: Date;
            updatedAt: Date;
            deleted: boolean;
            remedyId: string;
            diseaseId: string;
        })[];
        instructions: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            deleted: boolean;
            stepNumber: number;
            text: string;
            remedyId: string;
        }[];
        ingredients: ({
            ingredient: {
                name: string;
                id: string;
                createdAt: Date;
                updatedAt: Date;
                deleted: boolean;
                description: string | null;
            };
        } & {
            createdAt: Date;
            updatedAt: Date;
            deleted: boolean;
            ingredientId: string;
            remedyId: string;
            quantity: string | null;
        })[];
    } & {
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        deleted: boolean;
        description: string | null;
        value: number;
    }>;
    delete(id: string): Promise<{
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        deleted: boolean;
        description: string | null;
        value: number;
    }>;
}
