import { RemedyDiseaseService } from './remedy-disease.service';
import { CreateRemedyDiseaseDto, UpdateRemedyDiseaseDto } from './dto/remedy-disease.dto';
export declare class RemedyDiseaseController {
    private readonly remedyDiseaseService;
    constructor(remedyDiseaseService: RemedyDiseaseService);
    create(createRemedyDiseaseDto: CreateRemedyDiseaseDto): Promise<{
        createdAt: Date;
        updatedAt: Date;
        deleted: boolean;
        remedyId: string;
        diseaseId: string;
    }>;
    findAll(): Promise<{
        createdAt: Date;
        updatedAt: Date;
        deleted: boolean;
        remedyId: string;
        diseaseId: string;
    }[]>;
    findOne(remedyId: string, diseaseId: string): Promise<{
        createdAt: Date;
        updatedAt: Date;
        deleted: boolean;
        remedyId: string;
        diseaseId: string;
    }>;
    update(remedyId: string, diseaseId: string, updateRemedyDiseaseDto: UpdateRemedyDiseaseDto): Promise<{
        createdAt: Date;
        updatedAt: Date;
        deleted: boolean;
        remedyId: string;
        diseaseId: string;
    }>;
    remove(remedyId: string, diseaseId: string): Promise<{
        message: string;
    }>;
}
