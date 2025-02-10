import axios from "axios";
import { pool } from "../../config/pool.config";

export const storeMoviesSeries = async (minReleaseYear: number) => {
  const client = await pool.connect();
  const { TMDB_URL, TMDB_API_KEY } = process.env;

  try {
    const res = await client.query(
      `SELECT movies_series_stored from setup_status WHERE id = 1`
    );

    if (res.rowCount === 1 && res.rows[0].movies_series_stored) {
      console.log("🔥 Movies/series have already been stored. Skipping...");
      return;
    }

    const minVoteAverage = 6.0;
    const minVoteCount = 400;

    const fetchData = async (type: "movie" | "series") => {
      const params =
        type === "movie"
          ? {
              api_key: TMDB_API_KEY,
              "vote_average.gte": minVoteAverage,
              "vote_count.gte": minVoteCount,
              "primary_release_date.gte": `${minReleaseYear}-01-01`,
            }
          : {
              api_key: TMDB_API_KEY,
              "vote_average.gte": minVoteAverage,
              "vote_count.gte": minVoteCount,
              "first_air_date.gte": `${minReleaseYear}-01-01`,
            };

      let page = 1;
      let total_pages = 1;
      let total_results = 0;

      while (page <= total_pages) {
        const response = await axios.get(
          `${TMDB_URL}/discover/${type === "movie" ? "movie" : "tv"}`,
          {
            params: {
              ...params,
              page,
            },
          }
        );

        console.log(`🔥 Fetching page: ${page}`);

        total_pages = response.data.total_pages;
        total_results = response.data.total_results;

        console.log(
          `   Total results: ${total_results}, Total pages: ${total_pages}`
        );

        const query = `
					INSERT INTO movies_series (
						tmdb_id, type, title, name, original_title,
						original_name, original_language, overview,
						release_date, first_air_date, popularity,
						vote_average, vote_count, poster_path,
						backdrop_path, genre_ids
					) VALUES (
						$1, $2, $3, $4, $5, $6, $7, $8, $9, $10,
						$11, $12, $13, $14, $15, $16
					) ON CONFLICT (tmdb_id) DO NOTHING;
				`;

        const moviesSeries = response.data.results;
        for (const movieSeries of moviesSeries) {
          const values = [
            movieSeries.id,
            type,
            movieSeries.title,
            movieSeries.name,
            movieSeries.original_title,
            movieSeries.original_name,
            movieSeries.original_language,
            movieSeries.overview,
            movieSeries.release_date,
            movieSeries.first_air_date,
            movieSeries.popularity,
            movieSeries.vote_average,
            movieSeries.vote_count,
            movieSeries.poster_path,
            movieSeries.backdrop_path,
            movieSeries.genre_ids,
          ];

          await client.query(query, values);
        }

        page++;
      }
    };

    await client.query("BEGIN");

    await Promise.all([await fetchData("series"), await fetchData("movie")]);

    await client.query("COMMIT");

    await client.query(
      `
			UPDATE setup_status
			SET movies_series_stored = $1
			WHERE id = 1	
		`,
      [true]
    );
  } catch (error) {
    if (error instanceof Error) {
      await client.query("ROLLBACK");
      throw error;
    } else {
      throw new Error("Error storing movies_series");
    }
  } finally {
    client.release();
  }
};
