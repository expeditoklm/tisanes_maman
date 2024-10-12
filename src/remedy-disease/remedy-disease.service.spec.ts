import { Test, TestingModule } from '@nestjs/testing';
import { RemedyDiseaseService } from './remedy-disease.service';

describe('RemedyDiseaseService', () => {
  let service: RemedyDiseaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RemedyDiseaseService],
    }).compile();

    service = module.get<RemedyDiseaseService>(RemedyDiseaseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
