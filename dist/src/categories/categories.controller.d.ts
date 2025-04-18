import { CategoryService } from 'src/categories/categories.service';
import { CreateCategoryDto, UpdateCategoryDto } from 'src/categories/dto/categories.dto';
export declare class CategoryController {
    private readonly categoryService;
    constructor(categoryService: CategoryService);
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
