import { Controller, Get, Post, Body, Patch, Param, Delete, Query, HttpException, HttpStatus } from '@nestjs/common';
import { MarketHistoryService } from './market-history.service';
import { MarketHistory } from './dto/market-history.dto';
// import { CreateMarketHistoryDto } from './dto/create-market-history.dto';
// import { UpdateMarketHistoryDto } from './dto/update-market-history.dto';
import { ApiOkResponse, ApiParam, ApiProperty, ApiQuery, ApiResponse, ApiTags, getSchemaPath } from '@nestjs/swagger';


@ApiTags('marketHistory')
@Controller('market-history')
export class MarketHistoryController {
  constructor(private readonly marketHistoryService: MarketHistoryService) { 
  }  

  // @Post()
  // create(@Body() createMarketHistoryDto: CreateMarketHistoryDto) {
  //   return this.marketHistoryService.create(createMarketHistoryDto);
  // }

  // @Get()
  // findAll() {
  //   return this.marketHistoryService.findAll();
  // }

  @ApiParam({
    name: "i_exchange",
    enum: require('ccxt').exchanges,
    description: `Required to select the ticker on exchange`,
  })
  @ApiParam({
    name: 'i_ticker',
    example: 'XBTUSD',
    description: `Required to select the ticker on exchange`,
  })
  @ApiParam({
    name: 'i_timeFrame',
    enum: ['1m', '5m', '15m', '30m', '60m', '1h', '2h', '3h', '4h', '6h', '12h', '24h', '1d', '7d', '1w', '1M'],
    description: `Required to query the market history`,
  })
  @ApiQuery({
    name: "i_since",
    example: 1585267200000,
    description: "Used to query the market history since that date",
    required: false,
    type: Number
  })
  @ApiQuery({
    name: "i_limit",
    example: 1,
    description: "Used to query the market history at the defined limit",
    required: false,
    type: Number
  })
  @Get(':i_exchange/:i_ticker/:i_timeFrame')
  @ApiOkResponse({ description: 'Market History', type: Array, isArray: true })
  @ApiResponse({ status: 404, description: 'Not Found.' })
  async findOne(
    @Param('i_exchange') i_exchange: string,
    @Param('i_ticker') i_ticker: string,
    @Param('i_timeFrame') i_timeFrame: string,
    @Query('i_since') i_since?: Number,
    @Query('i_limit') i_limit?: Number
  ) {
    try {
      const response = await this.marketHistoryService.findOne(
        i_exchange.toLowerCase(),
        i_ticker.toUpperCase(),
        i_timeFrame,
        i_since ? Number(i_since) : undefined,
        i_limit ? Number(i_limit) : undefined
      );

      if (response.status) {
        throw ({ status: response.status, name: response.name, message: response.message });
      }

      return response;
    }
    catch (error) {
      throw new HttpException({ status: error.status || HttpStatus.NOT_FOUND, name: error.name, message: error.message }, HttpStatus.NOT_FOUND);
    }
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateMarketHistoryDto: UpdateMarketHistoryDto) {
  //   return this.marketHistoryService.update(+id, updateMarketHistoryDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.marketHistoryService.remove(+id);
  // }
}
