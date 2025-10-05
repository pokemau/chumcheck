import {
  Controller,
  Get,
  UseGuards,
  Render,
  Req,
  Post,
  Body,
  Res,
  Param,
  ParseIntPipe,
  UsePipes,
  ValidationPipe,
  NotFoundException,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateStartupDto } from './dto/create-startup.dto';
import { UpdateStartupDto } from './dto/update-startup.dto';
import { Request } from 'express'; // Import Request for flash messages

@Controller('admin')
// @UseGuards(AuthenticatedGuard) // Protect admin routes
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get()
  @Render('admin/dashboard')
  async dashboard(@Req() req: Request) {
    // Create static dashboard data instead of relying on API calls
    const dashboardData = {
      stats: {
        totalUsers: 3,
        totalStartups: 2,
        qualifiedStartups: 1,
        pendingStartups: 1,
      },
      recentActivity: [
        {
          date: 'May 28, 2025',
          action: 'System',
          details: 'Admin interface updated',
        },
        {
          date: 'May 28, 2025',
          action: 'User',
          details: 'New startup registered',
        },
        {
          date: 'May 27, 2025',
          action: 'Admin',
          details: 'User account created',
        },
      ],
    };

    return {
      user: req.user,
      message: 'Welcome to the Admin Dashboard!',
      dashboard: dashboardData,
    };
  }

  @Get('users')
  @Render('admin/users')
  async listUsers(@Req() req: Request) {
    // Add Request type
    const users = await this.adminService.getAllUsers();
    // req.flash('success', 'Successfully loaded users!'); // Example flash message
    return { user: req.user, users, message: 'Manage Users' };
  }

  @Get('users/create')
  @Render('admin/create-user')
  createUserForm(@Req() req: Request) {
    // Add Request type
    return { user: req.user, message: 'Create New User' };
  }

  @Post('users/create')
  @UsePipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      stopAtFirstError: true,
    }),
  )
  async createUser(
    @Req() req: Request,
    @Body() createUserDto: CreateUserDto,
    @Res() res,
  ) {
    try {
      await this.adminService.createUser(createUserDto);
      req.flash('success', 'User created successfully!');
      return res.redirect('/admin/users');
    } catch (error) {
      console.error('Error creating user:', error);
      req.flash('form_error', error.message || 'Could not create user.');
      req.flash('formData', createUserDto as any); // Flash the submitted data
      return res.redirect('/admin/users/create'); // Redirect back to the create form
    }
  }

  @Get('users/edit/:id')
  @Render('admin/edit-user')
  async editUserForm(
    @Param('id', ParseIntPipe) id: number,
    @Req() req: Request,
    @Res() res,
  ) {
    // Add Request type
    try {
      const editableUser = await this.adminService.getUserById(id);
      return {
        user: req.user,
        editableUser,
        message: `Edit User: ${editableUser.email}`,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        req.flash('error', 'User not found.');
        return res.redirect('/admin/users');
      }
      console.error('Error fetching user for edit:', error);
      req.flash('error', 'Error fetching user for edit.');
      return res.redirect('/admin/users');
    }
  }

  @Post('users/edit/:id')
  @UsePipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      stopAtFirstError: true,
    }),
  )
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
    @Req() req: Request, // Add Request type
    @Res() res,
  ) {
    try {
      await this.adminService.updateUser(id, updateUserDto);
      req.flash('success', 'User updated successfully!');
      return res.redirect('/admin/users');
    } catch (error) {
      console.error(`Error updating user ${id}:`, error);
      req.flash('form_error', error.message || 'Could not update user.');
      req.flash('formData', { ...updateUserDto, id } as any); // Flash submitted data
      return res.redirect(`/admin/users/edit/${id}`); // Redirect back to edit form
    }
  }

  // Changed to POST for better practice
  @Post('users/delete/:id')
  async deleteUser(
    @Param('id', ParseIntPipe) id: number,
    @Req() req: Request,
    @Res() res,
  ) {
    // Add Request type
    try {
      await this.adminService.deleteUser(id);
      req.flash('success', 'User deleted successfully!');
    } catch (error) {
      console.error(`Error deleting user ${id}:`, error);
      const errorMessage =
        error instanceof NotFoundException
          ? 'User not found.'
          : 'Could not delete user.';
      req.flash('error', errorMessage);
    }
    return res.redirect('/admin/users');
  }

  // --- Startup Routes ---

  @Get('startups')
  @Render('admin/startups')
  async listStartups(@Req() req: Request) {
    const startups = await this.adminService.getAllStartups();
    return { user: req.user, startups, message: 'Manage Startups' };
  }

  @Get('startups/create')
  @Render('admin/create-startup')
  async createStartupForm(@Req() req: Request) {
    const users = await this.adminService.getAllUsers(); // Reverted: For selecting startup owner
    return { user: req.user, users, message: 'Create New Startup' };
  }

  @Post('startups/create')
  @UsePipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      stopAtFirstError: true,
    }),
  )
  async createStartup(
    @Req() req: Request,
    @Body() createStartupDto: CreateStartupDto,
    @Res() res,
  ) {
    try {
      await this.adminService.createStartup(createStartupDto);
      req.flash('success', 'Startup created successfully!');
      return res.redirect('/admin/startups');
    } catch (error) {
      console.error('Error creating startup:', error);
      const users = await this.adminService.getAllUsers(); // Reverted: Ensure users list is passed back to the form in case of error
      req.flash('form_error', error.message || 'Could not create startup.');
      req.flash('formData', createStartupDto as any);
      return res.redirect('/admin/startups/create');
    }
  }

  @Get('startups/edit/:id')
  @Render('admin/edit-startup')
  async editStartupForm(
    @Param('id', ParseIntPipe) id: number,
    @Req() req: Request,
    @Res() res,
  ) {
    try {
      const editableStartup = await this.adminService.getStartupById(id);
      const users = await this.adminService.getAllUsers(); // Reverted: For selecting startup owner
      return {
        user: req.user,
        editableStartup,
        users,
        message: `Edit Startup: ${editableStartup.name}`,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        req.flash('error', 'Startup not found.');
        return res.redirect('/admin/startups');
      }
      console.error('Error fetching startup for edit:', error);
      req.flash('error', 'Error fetching startup for edit.');
      return res.redirect('/admin/startups');
    }
  }

  @Post('startups/edit/:id')
  @UsePipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      stopAtFirstError: true,
    }),
  )
  async updateStartup(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateStartupDto: UpdateStartupDto,
    @Req() req: Request,
    @Res() res,
  ) {
    try {
      await this.adminService.updateStartup(id, updateStartupDto);
      req.flash('success', 'Startup updated successfully!');
      return res.redirect('/admin/startups');
    } catch (error) {
      console.error(`Error updating startup ${id}:`, error);
      const users = await this.adminService.getAllUsers(); // Reverted: Ensure users list is passed back to the form in case of error
      req.flash('form_error', error.message || 'Could not update startup.');
      req.flash('formData', { ...updateStartupDto, id } as any);
      return res.redirect(`/admin/startups/edit/${id}`);
    }
  }

  @Post('startups/delete/:id')
  async deleteStartup(
    @Param('id', ParseIntPipe) id: number,
    @Req() req: Request,
    @Res() res,
  ) {
    try {
      await this.adminService.deleteStartup(id);
      req.flash('success', 'Startup deleted successfully!');
    } catch (error) {
      console.error(`Error deleting startup ${id}:`, error);
      const errorMessage =
        error instanceof NotFoundException
          ? 'Startup not found.'
          : 'Could not delete startup.';
      req.flash('error', errorMessage);
    }
    return res.redirect('/admin/startups');
  }
}
