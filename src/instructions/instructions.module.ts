import { Module } from '@nestjs/common';
import { InstructionController } from './instructions.controller';
import { InstructionService } from './instructions.service';

@Module({
  controllers: [InstructionController],
  providers: [InstructionService]
})
export class InstructionsModule {}
