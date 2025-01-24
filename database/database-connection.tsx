import * as SQLite from 'expo-sqlite';

export const DatabaseConnection = {
  getConnection: () => SQLite.openDatabaseSync("nazar.db"),
};