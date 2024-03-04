import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ToursModule } from './tours/tours.module';
import { MongooseModule } from '@nestjs/mongoose';
@Module({
  imports: [
    ToursModule,
    MongooseModule.forRoot('mongodb://localhost:27017/nestjs_test')
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
