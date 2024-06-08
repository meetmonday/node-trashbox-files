-- CreateTable
CREATE TABLE "FileMetadata" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "file_id" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "package_name" TEXT NOT NULL,
    "size" TEXT NOT NULL,
    "topic_id" INTEGER NOT NULL,
    "file_url" TEXT NOT NULL,
    "title" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "FileMetadata_file_id_key" ON "FileMetadata"("file_id");
