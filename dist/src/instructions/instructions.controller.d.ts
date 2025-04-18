import { CreateInstructionDto, UpdateInstructionDto } from './dto/instructions.dto';
import { InstructionService } from './instructions.service';
export declare class InstructionController {
    private readonly instructionService;
    constructor(instructionService: InstructionService);
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
