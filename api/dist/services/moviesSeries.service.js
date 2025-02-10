import { getMoviesSeries, insertFavouriteMovieSeries, } from "../database/models/moviesSeries.model.js";
export const processGetMoviesSeries = async (recommendationData, user_id) => {
    try {
        const moviesSeries = await getMoviesSeries(recommendationData, user_id);
        return moviesSeries;
    }
    catch (error) {
        if (error instanceof Error) {
            throw error;
        }
    }
};
// Like and insert movie series into favourites table
export const processLikeMovieSeries = async (user_id, movie_series_id) => {
    try {
        // Insert into favourite_movies_series table
        return await insertFavouriteMovieSeries(user_id, movie_series_id);
    }
    catch (error) {
        if (error instanceof Error) {
            throw error;
        }
    }
};
