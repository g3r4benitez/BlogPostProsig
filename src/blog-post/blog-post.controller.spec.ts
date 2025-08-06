import { Test, TestingModule } from '@nestjs/testing';
import { BlogPostController } from './blog-post.controller';
import { BlogPostService } from './blog-post.service';
import { CreateBlogPostDto } from './dto/create-blog-post.dto';
import { BlogPost } from './entities/blog-post.entity';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';

describe('BlogPostController', () => {
  let controller: BlogPostController;
  let service: BlogPostService;

  const mockBlogPostService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOneWithComments: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BlogPostController],
      providers: [
        {
          provide: BlogPostService,
          useValue: mockBlogPostService,
        },
      ],
    }).compile();

    controller = module.get<BlogPostController>(BlogPostController);
    service = module.get<BlogPostService>(BlogPostService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a blog post', async () => {
      const createBlogPostDto: CreateBlogPostDto = {
        title: 'Test Title',
        content: 'Test Content',
      };

      const mockBlogPost: BlogPost = {
        id: 1,
        title: 'Test Title',
        content: 'Test Content',
        total_coments: 0,
        comments: [],
      };

      mockBlogPostService.create.mockResolvedValue(mockBlogPost);

      const result = await controller.create(createBlogPostDto);

      expect(service.create).toHaveBeenCalledWith(createBlogPostDto);
      expect(result).toEqual(mockBlogPost);
    });
  });

  describe('CreateBlogPostDto validation', () => {
    it('should pass validation with valid data', async () => {
      const dto = plainToClass(CreateBlogPostDto, {
        title: 'Valid Title',
        content: 'Valid content for the blog post',
      });

      const errors = await validate(dto);
      expect(errors).toHaveLength(0);
    });

    it('should fail validation when title is empty', async () => {
      const dto = plainToClass(CreateBlogPostDto, {
        title: '',
        content: 'Valid content',
      });

      const errors = await validate(dto);
      expect(errors).toHaveLength(1);
      expect(errors[0].property).toBe('title');
    });

    it('should fail validation when title exceeds 200 characters', async () => {
      const dto = plainToClass(CreateBlogPostDto, {
        title: 'a'.repeat(201),
        content: 'Valid content',
      });

      const errors = await validate(dto);
      expect(errors).toHaveLength(1);
      expect(errors[0].property).toBe('title');
    });

    it('should fail validation when content is empty', async () => {
      const dto = plainToClass(CreateBlogPostDto, {
        title: 'Valid Title',
        content: '',
      });

      const errors = await validate(dto);
      expect(errors).toHaveLength(1);
      expect(errors[0].property).toBe('content');
    });

    it('should fail validation when content exceeds 2000 characters', async () => {
      const dto = plainToClass(CreateBlogPostDto, {
        title: 'Valid Title',
        content: 'a'.repeat(2001),
      });

      const errors = await validate(dto);
      expect(errors).toHaveLength(1);
      expect(errors[0].property).toBe('content');
    });

    it('should fail validation when title is not a string', async () => {
      const dto = plainToClass(CreateBlogPostDto, {
        title: 123,
        content: 'Valid content',
      });

      const errors = await validate(dto);
      expect(errors).toHaveLength(1);
      expect(errors[0].property).toBe('title');
    });
  });

  describe('findAll', () => {
    it('should return all blog posts', async () => {
      const mockBlogPosts: BlogPost[] = [
        {
          id: 1,
          title: 'Post 1',
          content: 'Content 1',
          total_coments: 0,
          comments: [],
        },
        {
          id: 2,
          title: 'Post 2',
          content: 'Content 2',
          total_coments: 1,
          comments: [],
        },
      ];

      mockBlogPostService.findAll.mockResolvedValue(mockBlogPosts);

      const result = await controller.findAll();

      expect(service.findAll).toHaveBeenCalled();
      expect(result).toEqual(mockBlogPosts);
    });
  });

  describe('findOne', () => {
    it('should return a blog post by id', async () => {
      const mockBlogPost: BlogPost = {
        id: 1,
        title: 'Test Post',
        content: 'Test Content',
        total_coments: 2,
        comments: [],
      };

      mockBlogPostService.findOneWithComments.mockResolvedValue(mockBlogPost);

      const result = await controller.findOne('1');

      expect(service.findOneWithComments).toHaveBeenCalledWith(1);
      expect(result).toEqual(mockBlogPost);
    });
  });
});
