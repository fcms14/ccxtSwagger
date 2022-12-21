import { Injectable } from '@nestjs/common';
import { ExecException } from 'child_process';
import { CreateMarketHistoryDto } from './dto/create-market-history.dto';
import { UpdateMarketHistoryDto } from './dto/update-market-history.dto';

@Injectable()
export class MarketHistoryService {
  // create(createMarketHistoryDto: CreateMarketHistoryDto) {
  //   return 'This action adds a new marketHistory';
  // }

  findAll() {
    // return `This action returns all marketHistory`;
  }

  async findOne(i_exchange: string, i_ticker: string, i_timeFrame: string, i_since?: Number, i_limit?: Number) {
    try {
      const ccxt = require('ccxt');

      if (!ccxt.exchanges.includes(i_exchange)) {
        throw { name: "Try again", message: "Exchange does not exists" };
      }

      const exchange = new ccxt.pro[i_exchange]();
      const ohlcv = await exchange.fetchOHLCV(i_ticker, i_timeFrame, i_since, i_limit);

      for (let i = 0; i < ohlcv.length; i++) {
        ohlcv[i] = [new Date(ohlcv[i][0]), ...ohlcv[i]];
      }

      return ohlcv;
    }
    catch (error) {
      return { title: error.name, message: error.message };
    }

    // const exchange = new ccxt.binance();
    // const limit = 5;
    // const orders = await exchange.fetchOrderBook('XBTUSD', limit, {});
    // const orders = await exchange.fetchTickers();
    // const symbols = await exchange.fetchMarkets();
    // const orders = await exchange.fetchTickers();
    // const symbols = Object.keys(exchange.markets);
    // return `This action returns a #${id} marketHistory`;
  }

  // update(id: number, updateMarketHistoryDto: UpdateMarketHistoryDto) {
  //   return `This action updates a #${id} marketHistory`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} marketHistory`;
  // }
}
