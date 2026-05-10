import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { MenuModule } from './menu/menu.module';
import { OrdersModule } from './orders/orders.module';
import { ReservationsModule } from './reservations/reservations.module';
import { PaymentsModule } from './payments/payments.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'oracle',
      host: 'localhost',
      port: 1521,
      username: 'system',
      password: 'Oracle123',
      connectString: 'localhost/freepdb1',

      // ✅ FIX: automatically loads ALL entities (Order included)
      autoLoadEntities: true,

      synchronize: true,
    }),

    MenuModule,
    OrdersModule,
    ReservationsModule,
    PaymentsModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}