import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { Game } from '../../domain/game';

export abstract class GameRepository {
  abstract create(
    data: Omit<Game, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Game>;

  abstract findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<Game[]>;

  abstract findById(id: Game['id']): Promise<NullableType<Game>>;

  abstract findByIds(ids: Game['id'][]): Promise<Game[]>;

  abstract update(
    id: Game['id'],
    payload: DeepPartial<Game>,
  ): Promise<Game | null>;

  abstract remove(id: Game['id']): Promise<void>;
}
