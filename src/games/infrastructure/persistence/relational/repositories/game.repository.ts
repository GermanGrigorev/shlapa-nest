import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { GameEntity } from '../entities/game.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { Game } from '../../../../domain/game';
import { GameRepository } from '../../game.repository';
import { GameMapper } from '../mappers/game.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';

@Injectable()
export class GameRelationalRepository implements GameRepository {
  constructor(
    @InjectRepository(GameEntity)
    private readonly gameRepository: Repository<GameEntity>,
  ) {}

  async create(data: Game): Promise<Game> {
    const persistenceModel = GameMapper.toPersistence(data);
    const newEntity = await this.gameRepository.save(
      this.gameRepository.create(persistenceModel),
    );
    return GameMapper.toDomain(newEntity);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<Game[]> {
    const entities = await this.gameRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });

    return entities.map((entity) => GameMapper.toDomain(entity));
  }

  async findById(id: Game['id']): Promise<NullableType<Game>> {
    const entity = await this.gameRepository.findOne({
      where: { id },
    });

    return entity ? GameMapper.toDomain(entity) : null;
  }

  async findByIds(ids: Game['id'][]): Promise<Game[]> {
    const entities = await this.gameRepository.find({
      where: { id: In(ids) },
    });

    return entities.map((entity) => GameMapper.toDomain(entity));
  }

  async update(id: Game['id'], payload: Partial<Game>): Promise<Game> {
    const entity = await this.gameRepository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new Error('Record not found');
    }

    const updatedEntity = await this.gameRepository.save(
      this.gameRepository.create(
        GameMapper.toPersistence({
          ...GameMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return GameMapper.toDomain(updatedEntity);
  }

  async remove(id: Game['id']): Promise<void> {
    await this.gameRepository.delete(id);
  }
}
