import { IMovie, TSort } from "./Movies"

interface IMoviePreviewProps {
	movie: IMovie,
	index: number
}

export const MoviePreview = ({ movie, index }: IMoviePreviewProps) => {
	return (
		<>
			<div key={`movie-${index}`}>
				<small>
					{movie.year} - {movie.title} - {movie.genres[0]}
				</small>
				<br />
			</div>
		</>)
}
