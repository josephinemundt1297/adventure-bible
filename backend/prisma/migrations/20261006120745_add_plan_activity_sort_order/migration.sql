-- AlterTable
ALTER TABLE "PlanActivity" ADD COLUMN     "sortOrder" INTEGER NOT NULL DEFAULT 0;

-- CreateIndex
CREATE INDEX "PlanActivity_sortOrder_idx" ON "PlanActivity"("sortOrder");
