import { Test, TestingModule } from '@nestjs/testing';
import { RemedyIngredientController } from './remedy-ingredient.controller';

describe('RemedyIngredientController', () => {
  let controller: RemedyIngredientController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RemedyIngredientController],
    }).compile();

    controller = module.get<RemedyIngredientController>(RemedyIngredientController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
