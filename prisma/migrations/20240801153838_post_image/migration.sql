-- AlterTable
ALTER TABLE "Posts" ADD COLUMN     "image" TEXT,
ALTER COLUMN "body" DROP NOT NULL;
