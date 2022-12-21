import { Test, TestingModule } from '@nestjs/testing';
import { MarketHistoryController } from './market-history.controller';
import { MarketHistoryService } from './market-history.service';

describe('MarketHistoryController', () => {
  let controller: MarketHistoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MarketHistoryController],
      providers: [MarketHistoryService],
    }).compile();

    controller = module.get<MarketHistoryController>(MarketHistoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
