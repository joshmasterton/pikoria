import { createFavouriteMoviesSeriesTable } from "../database/migrations/moviesseries.migration";
// import { createDatabaseIfNotExists } from "./database.config";

export const startApi = async () => {
  const { POSTGRES_ADMIN_URL } = process.env;

  if (!POSTGRES_ADMIN_URL) {
    throw new Error("Environmental variables not found");
  }

  try {
    // await createDatabaseIfNotExists();
    await createFavouriteMoviesSeriesTable();
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    } else {
      throw new Error("Error starting api");
    }
  }
};
