-- CreateEnum
CREATE TYPE "HpCheckType" AS ENUM ('FULL', 'MINI');

-- CreateEnum
CREATE TYPE "QuestType" AS ENUM ('MAIN', 'SIDE', 'DAILY', 'RECOVERY');

-- CreateEnum
CREATE TYPE "QuestLogStatus" AS ENUM ('STARTED', 'COMPLETED', 'POSTPONED', 'SKIPPED');

-- CreateEnum
CREATE TYPE "JournalEntryType" AS ENUM ('EVENT', 'REFLECTION');

-- CreateTable
CREATE TABLE "UserProfile" (
    "id" TEXT NOT NULL,
    "authUserId" TEXT NOT NULL,
    "displayName" TEXT NOT NULL,
    "characterName" TEXT NOT NULL,
    "level" INTEGER NOT NULL DEFAULT 1,
    "xp" INTEGER NOT NULL DEFAULT 0,
    "questPoints" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HpCheck" (
    "id" TEXT NOT NULL,
    "userProfileId" TEXT NOT NULL,
    "type" "HpCheckType" NOT NULL,
    "body" INTEGER NOT NULL,
    "energy" INTEGER NOT NULL,
    "focus" INTEGER NOT NULL,
    "mood" INTEGER NOT NULL,
    "overallScore" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "HpCheck_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Quest" (
    "id" TEXT NOT NULL,
    "userProfileId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "type" "QuestType" NOT NULL,
    "difficulty" INTEGER NOT NULL,
    "estimatedMinutes" INTEGER,
    "xpReward" INTEGER NOT NULL DEFAULT 0,
    "questPointReward" INTEGER NOT NULL DEFAULT 0,
    "isArchived" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Quest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuestLog" (
    "id" TEXT NOT NULL,
    "userProfileId" TEXT NOT NULL,
    "questId" TEXT NOT NULL,
    "status" "QuestLogStatus" NOT NULL,
    "startedAt" TIMESTAMP(3),
    "completedAt" TIMESTAMP(3),
    "scorePoints" INTEGER,
    "note" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "QuestLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "JournalEntry" (
    "id" TEXT NOT NULL,
    "userProfileId" TEXT NOT NULL,
    "entryDate" TIMESTAMP(3),
    "entryTime" TEXT,
    "type" "JournalEntryType" NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT,
    "questLogId" TEXT,
    "hpCheckId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "JournalEntry_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserProfile_authUserId_key" ON "UserProfile"("authUserId");

-- CreateIndex
CREATE INDEX "HpCheck_userProfileId_idx" ON "HpCheck"("userProfileId");

-- CreateIndex
CREATE INDEX "HpCheck_createdAt_idx" ON "HpCheck"("createdAt");

-- CreateIndex
CREATE INDEX "Quest_userProfileId_idx" ON "Quest"("userProfileId");

-- CreateIndex
CREATE INDEX "Quest_type_idx" ON "Quest"("type");

-- CreateIndex
CREATE INDEX "Quest_isArchived_idx" ON "Quest"("isArchived");

-- CreateIndex
CREATE INDEX "QuestLog_userProfileId_idx" ON "QuestLog"("userProfileId");

-- CreateIndex
CREATE INDEX "QuestLog_questId_idx" ON "QuestLog"("questId");

-- CreateIndex
CREATE INDEX "QuestLog_status_idx" ON "QuestLog"("status");

-- CreateIndex
CREATE INDEX "QuestLog_createdAt_idx" ON "QuestLog"("createdAt");

-- CreateIndex
CREATE INDEX "QuestLog_completedAt_idx" ON "QuestLog"("completedAt");

-- CreateIndex
CREATE INDEX "JournalEntry_userProfileId_idx" ON "JournalEntry"("userProfileId");

-- CreateIndex
CREATE INDEX "JournalEntry_entryDate_idx" ON "JournalEntry"("entryDate");

-- CreateIndex
CREATE INDEX "JournalEntry_type_idx" ON "JournalEntry"("type");

-- AddForeignKey
ALTER TABLE "HpCheck" ADD CONSTRAINT "HpCheck_userProfileId_fkey" FOREIGN KEY ("userProfileId") REFERENCES "UserProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Quest" ADD CONSTRAINT "Quest_userProfileId_fkey" FOREIGN KEY ("userProfileId") REFERENCES "UserProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestLog" ADD CONSTRAINT "QuestLog_userProfileId_fkey" FOREIGN KEY ("userProfileId") REFERENCES "UserProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestLog" ADD CONSTRAINT "QuestLog_questId_fkey" FOREIGN KEY ("questId") REFERENCES "Quest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JournalEntry" ADD CONSTRAINT "JournalEntry_userProfileId_fkey" FOREIGN KEY ("userProfileId") REFERENCES "UserProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JournalEntry" ADD CONSTRAINT "JournalEntry_questLogId_fkey" FOREIGN KEY ("questLogId") REFERENCES "QuestLog"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JournalEntry" ADD CONSTRAINT "JournalEntry_hpCheckId_fkey" FOREIGN KEY ("hpCheckId") REFERENCES "HpCheck"("id") ON DELETE SET NULL ON UPDATE CASCADE;
