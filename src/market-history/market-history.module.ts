import { Module } from '@nestjs/common';
import { MarketHistoryService } from './market-history.service';
import { MarketHistoryController } from './market-history.controller';

@Module({
  controllers: [MarketHistoryController],
  providers: [MarketHistoryService]
})
export class MarketHistoryModule {}
