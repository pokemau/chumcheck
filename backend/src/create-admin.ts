import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { EntityManager } from '@mikro-orm/postgresql';
import { User } from './entities/user.entity';
import { Role } from './entities/enums/role.enum';

async function createAdminUser() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const em = app.get(EntityManager);

  try {
    // Find the user we just created
    const user = await em.findOne(User, { email: 'admin@chumcheck.com' });

    if (user) {
      user.role = Role.Manager;
      await em.persistAndFlush(user);
      console.log(`✅ Updated user ${user.email} to Manager role`);
    } else {
      console.log('❌ Admin user not found');
    }
  } catch (error) {
    console.error('Error updating user role:', error);
  } finally {
    await app.close();
  }
}

createAdminUser();
