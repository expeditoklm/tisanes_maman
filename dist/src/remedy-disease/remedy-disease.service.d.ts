import { PrismaService } from 'src/prisma/prisma.service';
import { CreateRemedyDiseaseDto, UpdateRemedyDiseaseDto } from './dto/remedy-disease.dto';
export declare class RemedyDiseaseService {
    private prisma;
    constructor(prisma: PrismaService);
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
