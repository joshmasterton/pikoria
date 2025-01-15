import {
  createMoviesSeriesTable,
  deleteMoviesSeriesTable,
} from "../database/migrations/moviesseries.migration";
import { createDatabaseIfNotExists } from "./database.config";

export const startApi = async () => {
  try {
    await createDatabaseIfNotExists();
    await deleteMoviesSeriesTable();
    await createMoviesSeriesTable();
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    } else {
      throw new Error("Error starting api");
    }
  }
};
