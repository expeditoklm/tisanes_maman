import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCategoryDto, UpdateCategoryDto } from './dto/categories.dto';
export declare class CategoryService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createCategoryDto: CreateCategoryDto): Promise<{
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        deleted: boolean;
    }>;
    findAll(): Promise<({
        diseases: {
            name: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            deleted: boolean;
            description: string | null;
            categoryId: string | null;
        }[];
    } & {
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        deleted: boolean;
    })[]>;
    findOne(id: string): Promise<{
        diseases: {
            name: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            deleted: boolean;
            description: string | null;
            categoryId: string | null;
        }[];
    } & {
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        deleted: boolean;
    }>;
    update(id: string, updateCategoryDto: UpdateCategoryDto): Promise<{
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        deleted: boolean;
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
