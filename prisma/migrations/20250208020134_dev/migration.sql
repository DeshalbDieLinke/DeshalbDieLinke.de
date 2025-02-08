-- CreateTable
CREATE TABLE "Content" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "official" BOOLEAN NOT NULL DEFAULT false,
    "authorId" TEXT,
    "alt" TEXT,
    "type" TEXT,
    "topics" TEXT,

    CONSTRAINT "Content_pkey" PRIMARY KEY ("id")
);
