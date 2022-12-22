import { HttpStatus, Injectable } from '@nestjs/common';
import { ExecException } from 'child_process';
import { CreateMarketHistoryDto } from './dto/create-market-history.dto';
import { UpdateMarketHistoryDto } from './dto/update-market-history.dto';

@Injectable()
export class MarketHistoryService {
  // create(createMarketHistoryDto: CreateMarketHistoryDto) {
  //   return 'This action adds a new marketHistory';
  // }

  // findAll() {
  //   return `This action returns all marketHistory`;
  // }

  async findOne(i_exchange: string, i_ticker: string, i_timeFrame: string, i_since?: Number, i_limit?: Number) {
    const ccxt = require('ccxt');

    if (!ccxt.exchanges.includes(i_exchange)) {
      return { status: HttpStatus.NOT_FOUND, name: "Not Found", message: "Exchange does not exists" };
    }

    const exchange = ccxt.pro.exchanges.includes(i_exchange) ? new ccxt.pro[i_exchange]() : new ccxt[i_exchange]();
    const markets = await exchange.loadMarkets();
    const symbols = exchange.symbols;
    let tickers = [];

    for (let m in markets) {
      tickers = [...tickers, exchange.marketId(m)]
    }

    if (!symbols.includes(i_ticker) && !tickers.includes(i_ticker)) {
      return { status: HttpStatus.NOT_FOUND, name: "Not Found", message: `Ticker does not exists.\nTry one of: ${symbols}` };
    }

    const ohlcv = await exchange.fetchOHLCV(i_ticker, i_timeFrame, i_since, i_limit);

    if (!ohlcv.length) {
      return { status: HttpStatus.NOT_FOUND, name: "Not Found", message: "No data found in this period" };
    }

    for (let i = 0; i < ohlcv.length; i++) {
      ohlcv[i] = [new Date(ohlcv[i][0]), ...ohlcv[i]];
    }

    return ohlcv;
  }

  // update(id: number, updateMarketHistoryDto: UpdateMarketHistoryDto) {
  //   return `This action updates a #${id} marketHistory`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} marketHistory`;
  // }
}
