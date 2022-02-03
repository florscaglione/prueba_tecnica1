import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { ContactModule } from './contacts/contacts.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/nest'), //importamos el modelo (schema)
    UsersModule,
    ContactModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
