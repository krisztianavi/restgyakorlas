import { IsString, IsInt, IsBoolean, IsOptional } from 'class-validator';

export class UpdateBookDto {
    @IsOptional()
    @IsString()
    title?: string;

    @IsOptional()
    @IsString()
    author?: string;

    @IsOptional()
    @IsBoolean()
    isbn?: boolean;

    @IsOptional()
    @IsInt()
    publishYear?: number;

    @IsOptional()
    @IsBoolean()
    reserved?: boolean;
}
