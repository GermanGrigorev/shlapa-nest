import { Module } from '@nestjs/common';
import { GameRepository } from '../game.repository';
import { GameRelationalRepository } from './repositories/game.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GameEntity } from './entities/game.entity';

@Module({
  imports: [TypeOrmModule.forFeature([GameEntity])],
  providers: [
    {
      provide: GameRepository,
      useClass: GameRelationalRepository,
    },
  ],
  exports: [GameRepository],
})
export class RelationalGamePersistenceModule {}
