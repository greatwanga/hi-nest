import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query, Req } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entities/movie.entity';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {

    constructor(readonly movieService: MoviesService) {}

    @Get()
    findAll(@Req() req, @Req() res): Movie[] {
        return this.movieService.findAll();
    }

    @Get(":id")
    findOne(@Param("id") id: number): Movie {
        return this.movieService.findOne(id);
    }

    @Post()
    create(@Body() createMovieDto: CreateMovieDto) {
        return this.movieService.create(createMovieDto);
    }

    @Delete(":id")
    remove(@Param('id') id: number) {
        return this.movieService.remove(id);
    }

    @Patch(':id')
    update(@Param('id') id: number, @Body() updateMovieDto: UpdateMovieDto) {
        return this.movieService.update(id, updateMovieDto);
    }
}
