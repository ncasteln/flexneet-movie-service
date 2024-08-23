import { IMovie, TSort } from "./Movies"

interface IPreviewProps {
	movie: IMovie,
	index: number
}

export const Preview = ({ movie, index }: IPreviewProps) => {

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
