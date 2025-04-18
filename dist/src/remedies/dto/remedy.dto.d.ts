import { CreateIngredientDto } from 'src/ingredients/dto/ingredient.dto';
import { CreateInstructionDto } from 'src/instructions/dto/instructions.dto';
export declare class CreateRemedyDto {
    name: string;
    value: number;
    description?: string;
    ingredientIds?: string[];
    diseaseIds?: string[];
    newIngredients?: CreateIngredientDto[];
    instructions?: CreateInstructionDto[];
    newInstructions?: CreateInstructionDto[];
}
