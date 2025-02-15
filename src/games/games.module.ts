import { Module } from '@nestjs/common';
import { GamesService } from './games.service';
import { GamesController } from './games.controller';
import { RelationalGamePersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';

@Module({
  imports: [
    // import modules, etc.
    RelationalGamePersistenceModule,
  ],
  controllers: [GamesController],
  providers: [GamesService],
  exports: [GamesService, RelationalGamePersistenceModule],
})
export class GamesModule {}
