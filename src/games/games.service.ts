import { Injectable } from '@nestjs/common';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { GameRepository } from './infrastructure/persistence/game.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { Game } from './domain/game';

@Injectable()
export class GamesService {
  constructor(
    // Dependencies here
    private readonly gameRepository: GameRepository,
  ) {}

  async create(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    createGameDto: CreateGameDto,
  ) {
    // Do not remove comment below.
    // <creating-property />

    return this.gameRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
    });
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.gameRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(id: Game['id']) {
    return this.gameRepository.findById(id);
  }

  findByIds(ids: Game['id'][]) {
    return this.gameRepository.findByIds(ids);
  }

  async update(
    id: Game['id'],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    updateGameDto: UpdateGameDto,
  ) {
    // Do not remove comment below.
    // <updating-property />

    return this.gameRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
    });
  }

  remove(id: Game['id']) {
    return this.gameRepository.remove(id);
  }
}
