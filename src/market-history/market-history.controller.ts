import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { MarketHistoryService } from './market-history.service';
import { MarketHistory } from './dto/market-history.dto';
// import { CreateMarketHistoryDto } from './dto/create-market-history.dto';
// import { UpdateMarketHistoryDto } from './dto/update-market-history.dto';
import { ApiOkResponse, ApiParam, ApiProperty, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('marketHistory')
@Controller('market-history')
export class MarketHistoryController {
  constructor(private readonly marketHistoryService: MarketHistoryService) { }

  // @Post()
  // create(@Body() createMarketHistoryDto: CreateMarketHistoryDto) {
  //   return this.marketHistoryService.create(createMarketHistoryDto);
  // }

  // @Get()
  // findAll() {
  //   return this.marketHistoryService.findAll();
  // }

  @ApiParam({
    name: 'i_exchange',
    example: 'BITMEX',
    description: `Required to construct the exchange class`,
  })
  @ApiParam({
    name: 'i_ticker',
    example: 'XBTUSD',
    description: `Required to select the ticker on exchange`,
  })
  @ApiParam({
    name: 'i_timeFrame',
    example: '1d',
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
    example: 100,
    description: "Used to query the market history at the defined limit. max limit = 1000",
    required: false,
    type: Number
  })
  @Get(':i_exchange/:i_ticker/:i_timeFrame')
  @ApiOkResponse({ description: 'Market History', type: Array, isArray: true})
  @ApiResponse({ status: 404, description: 'Not Found.'})
  findOne(
    @Param('i_exchange') i_exchange: string,
    @Param('i_ticker') i_ticker: string,
    @Param('i_timeFrame') i_timeFrame: string,
    @Query('i_since') i_since?: Number,
    @Query('i_limit') i_limit?: Number
  ) {
    return this.marketHistoryService.findOne(
      i_exchange.toLowerCase(),
      i_ticker.toUpperCase(),
      i_timeFrame.toLowerCase(),
      i_since ? Number(i_since) : undefined,
      i_limit ? Number(i_limit) : undefined
    );
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
