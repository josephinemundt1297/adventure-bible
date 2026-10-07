-- CreateEnum
CREATE TYPE "PlanActivityType" AS ENUM ('QUEST', 'PERSONAL');

-- CreateTable
CREATE TABLE "PlanActivity" (
    "id" TEXT NOT NULL,
    "userProfileId" TEXT NOT NULL,
    "questId" TEXT,
    "title" TEXT NOT NULL,
    "activityDate" TIMESTAMP(3) NOT NULL,
    "activityTime" TEXT NOT NULL,
    "type" "PlanActivityType" NOT NULL,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PlanActivity_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "PlanActivity_userProfileId_idx" ON "PlanActivity"("userProfileId");

-- CreateIndex
CREATE INDEX "PlanActivity_activityDate_idx" ON "PlanActivity"("activityDate");

-- CreateIndex
CREATE INDEX "PlanActivity_completed_idx" ON "PlanActivity"("completed");

-- AddForeignKey
ALTER TABLE "PlanActivity" ADD CONSTRAINT "PlanActivity_userProfileId_fkey" FOREIGN KEY ("userProfileId") REFERENCES "UserProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlanActivity" ADD CONSTRAINT "PlanActivity_questId_fkey" FOREIGN KEY ("questId") REFERENCES "Quest"("id") ON DELETE SET NULL ON UPDATE CASCADE;
