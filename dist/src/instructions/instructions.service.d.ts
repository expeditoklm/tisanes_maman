import { PrismaService } from 'src/prisma/prisma.service';
import { CreateInstructionDto, UpdateInstructionDto } from './dto/instructions.dto';
export declare class InstructionService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createInstructionDto: CreateInstructionDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        deleted: boolean;
        stepNumber: number;
        text: string;
        remedyId: string;
    }>;
    findAll(remedyId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        deleted: boolean;
        stepNumber: number;
        text: string;
        remedyId: string;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        deleted: boolean;
        stepNumber: number;
        text: string;
        remedyId: string;
    }>;
    update(id: string, updateInstructionDto: UpdateInstructionDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        deleted: boolean;
        stepNumber: number;
        text: string;
        remedyId: string;
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
