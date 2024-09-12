import { Container, Row, Col, Image } from "react-bootstrap"
import { IMovie, TCategory, TDisplayMode } from "./Movies"
import React from "react"
import { MoviePreview } from "./MoviePreview"

interface IMovieBlock {
	category: TCategory,
	categoryIndex: number,
	movies: IMovie[],
	display: TDisplayMode
	setMovieModal: React.Dispatch<React.SetStateAction<IMovie | null>>
}

export const MovieBlock = ({ category, categoryIndex, movies, display, setMovieModal }: IMovieBlock) => {

	if (display === "display-grid") {
		return (
			<Container>
				<Row>{ category }</Row>
				<Row xs={6} sm={12}>
					{ movies.map(movie => {
						return (
							<Col className="border" onClick={() => setMovieModal(movie)}>
								<h5>{movie.title}</h5>
								<Image
									src={movie.thumbnail}
									width={movie.thumbnail_width / 2}
									height={movie.thumbnail_height / 2}
									fluid/>
							</Col>
						)
					})}
				</Row>
			</Container>
		)
	}
	return (
		<Container>
			<Row>{ category }</Row>
			{ movies.map((movie, i) => {
				return <MoviePreview movie={movie} index={i} />
			})}
		</Container>
	)
}
