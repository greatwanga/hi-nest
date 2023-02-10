import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe("findAll", () => {
    it("should return an array", () => {
      const result = service.findAll();
      expect(result).toBeInstanceOf(Array);
    });
  });

  describe("findOne", () => {
    it("should return a movie", () => {
      service.create({
        title: 'Test Movie',
        year: 2000,
        genres: ['test'], 
      });
      const movie = service.findOne(1);
      expect(movie).toBeDefined();
    });
    it("should throw 404 error", () => {
      try{
        service.findOne(404);
      }
      catch(e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toEqual('Movie with ID 404 not found.');
      }
    });
  });

  describe("remove", () => {
    it("deletes a movie", () => {
      service.create({
        title: 'Test Movie',
        year: 2000,
        genres: ['test'], 
      });
      const beforeDelete = service.findAll().length;
      service.remove(1);
      const afterDelete = service.findAll().length;
      expect(afterDelete).toBeLessThan(beforeDelete);
    });
    it("should return a 404", () => {
      try {
        service.remove(404);
      } catch(e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe("create", () => {
    it("should create a movie", () => {
      const beforeCreate = service.findAll().length;
      service.create({
        title: 'Test Movie',
        year: 2000,
        genres: ['test'], 
      });
      const afterCreate = service.findAll().length;

    });
  });
});
