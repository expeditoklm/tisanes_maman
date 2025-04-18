import { PrismaService } from '../prisma/prisma.service';
import { CreateIngredientDto, UpdateIngredientDto } from './dto/ingredient.dto';
import { PrismaClient } from '@prisma/client';
export declare class IngredientService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createIngredientDto: CreateIngredientDto, prisma?: Omit<PrismaClient, "$connect" | "$disconnect" | "$on" | "$transaction" | "$use" | "$extends">): Promise<{
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        deleted: boolean;
        description: string | null;
    }>;
    private savePhotos;
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
    remove(id: string): Promise<{
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        deleted: boolean;
        description: string | null;
    }>;
}
