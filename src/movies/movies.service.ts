import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entities/movie.entity';

@Injectable()
export class MoviesService {
    private movies: Movie[] = [];

    findAll(): Movie[] {
        return this.movies;
    }

    findOne(id: number): Movie {
        const movie = this.movies.find(movie => movie.id === id);
        if (!movie) {
            throw new NotFoundException(`Movie with ID ${id} not found.`);
        }
        return movie;
    }

    remove(id: number) {
        this.findOne(id);
        this.movies = this.movies.filter(movie => movie.id !== id);
    }

    create(createMovieDto: CreateMovieDto) {
        this.movies.push({
            id: this.movies.length + 1,
            ...createMovieDto,
        })
    }

    update(id: number, updateMovieDto: UpdateMovieDto) {
        const movie = this.findOne(id);
        this.remove(id);
        this.movies.push({ ...movie, ...updateMovieDto});
    }
}
