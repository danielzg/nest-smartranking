import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JogadoresModule } from './jogadores/jogadores.module';

@Module({
  imports: [
    JogadoresModule,
    MongooseModule
      .forRoot('mongodb+srv://nest-project:s8Xjtx177W7PzVGy@cluster0.hthke.mongodb.net/smartranking?retryWrites=true&w=majority')
  ]
})
export class AppModule {}
