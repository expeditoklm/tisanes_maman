import { RemedyService } from './remedies.service';
import { CreateRemedyDto } from './dto/remedy.dto';
export declare class RemedyController {
    private readonly remedyService;
    constructor(remedyService: RemedyService);
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
