import { Test, TestingModule } from '@nestjs/testing';
import { RemedyDiseaseController } from './remedy-disease.controller';

describe('RemedyDiseaseController', () => {
  let controller: RemedyDiseaseController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RemedyDiseaseController],
    }).compile();

    controller = module.get<RemedyDiseaseController>(RemedyDiseaseController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
