import { DiseaseService } from './diseases.service';
import { CreateDiseaseDto, UpdateDiseaseDto } from './dto/diseases.dto';
export declare class DiseaseController {
    private readonly diseaseService;
    constructor(diseaseService: DiseaseService);
    create(createDiseaseDto: CreateDiseaseDto): Promise<{
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        deleted: boolean;
        description: string | null;
        categoryId: string | null;
    }>;
    findAll(): Promise<{
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        deleted: boolean;
        description: string | null;
        categoryId: string | null;
    }[]>;
    findOne(id: string): Promise<{
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        deleted: boolean;
        description: string | null;
        categoryId: string | null;
    }>;
    update(id: string, updateDiseaseDto: UpdateDiseaseDto): Promise<{
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        deleted: boolean;
        description: string | null;
        categoryId: string | null;
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
