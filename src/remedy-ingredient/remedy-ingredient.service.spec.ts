import { Test, TestingModule } from '@nestjs/testing';
import { RemedyIngredientService } from './remedy-ingredient.service';

describe('RemedyIngredientService', () => {
  let service: RemedyIngredientService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RemedyIngredientService],
    }).compile();

    service = module.get<RemedyIngredientService>(RemedyIngredientService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
