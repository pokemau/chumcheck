import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as hbs from 'hbs';
import * as session from 'express-session';
import flash = require('connect-flash'); // Corrected import for connect-flash

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // Register hbs helpers
  hbs.registerHelper('eq', function (a, b) {
    return a === b;
  });

  hbs.registerHelper('defaultIfEmpty', function (value, defaultValue) {
    return value ? value : defaultValue;
  });
  
  // Add additional helper for date formatting if needed
  hbs.registerHelper('formatDate', function (date) {
    if (!date) return '';
    return new Date(date).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  });

  app.useStaticAssets(join(__dirname, '..', 'public')); // Serve static assets from 'public' folder
  app.setBaseViewsDir(join(__dirname, '..', 'views')); // Set views directory
  app.setViewEngine('hbs'); // Set hbs as the view engine

  // Session middleware
  app.use(
    session({
      secret: process.env.SESSION_SECRET || 'your-secret-key', // Change this to a strong, unique secret
      resave: false,
      saveUninitialized: false,
      cookie: { maxAge: 3600000 }, // 1 hour
    }),
  );

  // Flash messages middleware
  app.use(flash());

  // Global middleware to make flash messages available in templates
  app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success');
    res.locals.error_msg = req.flash('error');
    res.locals.error = req.flash('form_error'); // For form validation errors
    res.locals.formData = req.flash('formData')[0] || {}; // For repopulating form
    next();
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      // Removed transformOptions: { enableImplicitConversion: true }
      // or explicitly set to false if needed: transformOptions: { enableImplicitConversion: false }
    }),
  );

  app.enableCors({
    origin: 'http://localhost:5173',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
