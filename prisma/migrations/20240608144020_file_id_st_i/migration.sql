/*
  Warnings:

  - You are about to alter the column `file_id` on the `FileMetadata` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_FileMetadata" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "file_id" INTEGER NOT NULL,
    "key" TEXT NOT NULL,
    "package_name" TEXT NOT NULL,
    "size" TEXT NOT NULL,
    "topic_id" INTEGER NOT NULL,
    "file_url" TEXT NOT NULL,
    "title" TEXT NOT NULL
);
INSERT INTO "new_FileMetadata" ("file_id", "file_url", "id", "key", "package_name", "size", "title", "topic_id") SELECT "file_id", "file_url", "id", "key", "package_name", "size", "title", "topic_id" FROM "FileMetadata";
DROP TABLE "FileMetadata";
ALTER TABLE "new_FileMetadata" RENAME TO "FileMetadata";
CREATE UNIQUE INDEX "FileMetadata_file_id_key" ON "FileMetadata"("file_id");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
