import { Button, Carousel, Image } from "react-bootstrap"
import { IMovie } from "./Movies"
import { useState } from "react";


interface ISuggestedMoviesProps {
  randomMovies: IMovie[],
}

export const SuggestedMovies = ({ randomMovies }: ISuggestedMoviesProps) => {
  const handleClick = ( movie: IMovie ) => {
    /* Open Modal */
  }

  return (
    <>
      <h2 className="display-5 text-secondary mt-3">You might like...</h2>
      <div className="d-flex overflow-scroll position-relative">
        {
          randomMovies.map(movie => {
            return (
              <Image
                className="me-3"
                src={movie.thumbnail}
                height={180}
                role="button"
                onClick={() => handleClick(movie)} />
            )
          })
        }
      </div>
    </>
  )
}
