import { Module } from '@nestjs/common';
import { MarketHistoryModule } from './market-history/market-history.module';

@Module({
  imports: [MarketHistoryModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
