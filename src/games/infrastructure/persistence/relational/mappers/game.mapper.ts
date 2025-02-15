import { Game } from '../../../../domain/game';
import { GameEntity } from '../entities/game.entity';

export class GameMapper {
  static toDomain(raw: GameEntity): Game {
    const domainEntity = new Game();
    domainEntity.id = raw.id;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: Game): GameEntity {
    const persistenceEntity = new GameEntity();
    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
