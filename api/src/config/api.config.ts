import { createFavouriteMoviesSeriesTable } from "../database/migrations/moviesseries.migration";
import { createDatabaseIfNotExists } from "./database.config";

export const startApi = async () => {
  const { POSTGRES_DB } = process.env;

  if (!POSTGRES_DB) {
    throw new Error("Environmental variables not found");
  }

  try {
    await createDatabaseIfNotExists();
    await createFavouriteMoviesSeriesTable();
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    } else {
      throw new Error("Error starting api");
    }
  }
};
