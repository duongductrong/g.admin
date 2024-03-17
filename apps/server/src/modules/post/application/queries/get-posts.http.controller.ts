import { Controller, Get, Inject, Query } from "@nestjs/common"
import { QueryBus } from "@nestjs/cqrs"
import { ApiOkResponse, ApiTags } from "@nestjs/swagger"
import { routes } from "@server/configs/routes.config"
import { SignalResponseDto } from "@server/core/classes/signal/dtos/signal-response.dto"
import { SignalBuilder } from "@server/core/classes/signal/signal.builder"
import { GENERAL_MESSAGES } from "@server/core/message.base"
import { GetPostsRequestDto, GetPostsResponseDto } from "./get-posts.dto"
import { GetPostsQuery } from "./get-posts.handler"

@ApiTags(routes.v1.posts.apiTag)
@Controller({ version: routes.v1.version })
export class GetPostsHttpController {
  @Inject() private readonly queryBus: QueryBus

  @Get(routes.v1.posts.root)
  @ApiOkResponse({ type: SignalResponseDto([GetPostsResponseDto]) })
  async run(@Query() query: GetPostsRequestDto) {
    const result = await this.queryBus.execute(new GetPostsQuery(query))
    return SignalBuilder.create().setData(result).setMessage(GENERAL_MESSAGES.QUERY_SUCCESS).build()
  }
}