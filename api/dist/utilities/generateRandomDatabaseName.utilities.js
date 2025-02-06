export const generateRandomDatabaseName = () => {
    return `test_db_${Math.random().toString(36).substring(2, 15)}`;
};
