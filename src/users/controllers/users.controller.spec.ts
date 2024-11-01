/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from '../services/users.service';
import { AssignUserDto } from './dto/assign-role.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { AssignAdminRoleGuard } from '../../auth/guards/assign-admin-role.guard';
import { User } from '../models/user.entity';
import { UserErrorMessage, UserRole } from '../../constants/users.constants';
import { NotFoundException } from '@nestjs/common';
import { Pagination } from 'nestjs-typeorm-paginate';
import { Request } from 'express';
import { hostname } from 'os';

describe('UsersController', () => {
  let controller: UsersController;
  let usersService: Partial<UsersService>;

  const mockUser: User = {
    id: 2,
    email: 'caio.fleury.r@gmail.com',
    firstName: 'Caio',
    lastName: 'Fleury',
    password: 'hashedPassword',
    role: UserRole.ADMIN,
    createAt: new Date('2024-08-27T10:11:04.408Z'),
    updateAt: new Date('2024-08-27T10:11:04.408Z'),
    deletedAt: null,
  } as User;
  const mockPaginationResult: Pagination<User> = {
    items: [mockUser],
    meta: {
      totalItems: 1,
      itemCount: 1,
      itemsPerPage: 10,
      totalPages: 1,
      currentPage: 1,
    },
    links: {
      first: 'link',
      previous: '',
      next: '',
      last: 'link',
    },
  };
  beforeEach(async () => {
    usersService = {
      assignRole: jest.fn().mockResolvedValue(mockUser),
      getAll: jest.fn().mockResolvedValue([mockUser]),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: usersService,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  describe('assignRole', () => {
    it('should assign a role to the user and return the updated user', async () => {
      const assignUserDto: AssignUserDto = { role: UserRole.AGENT };
      const result = await controller.assignRole('2', assignUserDto);

      expect(result).toEqual(mockUser);
      expect(usersService.assignRole).toHaveBeenCalledWith(2, assignUserDto);
    });

    it('should throw NotFoundException if the user is not found', async () => {
      jest
        .spyOn(usersService, 'assignRole')
        .mockRejectedValueOnce(
          new NotFoundException(UserErrorMessage.USER_DOES_NOT_EXIST),
        );

      const assignUserDto: AssignUserDto = { role: UserRole.AGENT };

      await expect(controller.assignRole('999', assignUserDto)).rejects.toThrow(
        new NotFoundException(UserErrorMessage.USER_DOES_NOT_EXIST),
      );
      expect(usersService.assignRole).toHaveBeenCalledWith(999, assignUserDto);
    });
  });

  describe('getAll', () => {
    it('should return a paginated list of users', async () => {
      const mockRequest = {
        protocol: 'http',
        hostname: 'localhost',
        path: '/api/users',
      } as unknown as Request;

      const result = await controller.getAll(mockRequest, 1);

      expect(result).toEqual(mockPaginationResult.items);
      expect(usersService.getAll).toHaveBeenCalledWith({
        page: 1,
        limit: 20,
        route: 'http://localhost:undefined/api/users',
      });
    });

    it('should return an empty array if no users are found', async () => {
      const emptyPaginationResult: Pagination<User> = {
        items: [],
        meta: {
          totalItems: 0,
          itemCount: 0,
          itemsPerPage: 10,
          totalPages: 0,
          currentPage: 1,
        },
        links: {
          first: 'link',
          previous: '',
          next: '',
          last: 'link',
        },
      };

      jest
        .spyOn(usersService, 'getAll')
        .mockResolvedValueOnce(emptyPaginationResult);

      const mockRequest = {
        protocol: 'http',
        hostname: 'localhost',
        path: '/api/users',
      } as unknown as Request;
      const result = await controller.getAll(mockRequest, 1);

      expect(result.items).toEqual([]);
      expect(result.meta.totalItems).toEqual(0);
      expect(usersService.getAll).toHaveBeenCalledWith({
        page: 1,
        limit: 20,
        route: 'http://localhost:undefined/api/users',
      });
    });
  });
});
