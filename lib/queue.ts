import { Queue } from "bullmq";
import IORedis from "ioredis";

export type ContentJobData = {
  keyword: string;
  userId?: string;
  priority?: "low" | "medium" | "high";
};

export type PublishJobData = {
  contentId: string;
  platforms: Array<"telegram" | "feishu" | "wordpress">;
};

const connection = new IORedis({
  host: process.env.REDIS_HOST,
  port: Number(process.env.REDIS_PORT),
  password: process.env.REDIS_PASSWORD,
  maxRetriesPerRequest: null,
  enableReadyCheck: false,
});

// 内容生成队列
export const contentGenerationQueue = new Queue<ContentJobData>("content-generation", {
  connection,
  defaultJobOptions: {
    attempts: 3,
    backoff: { type: "exponential", delay: 2000 },
    removeOnComplete: { age: 86400 },
    removeOnFail: { age: 604800 },
  },
});

// 内容发布队列
export const contentPublishQueue = new Queue<PublishJobData>("content-publish", {
  connection,
  defaultJobOptions: {
    attempts: 2,
    backoff: { type: "fixed", delay: 5000 },
  },
});

// 队列健康检查
export async function checkQueueHealth() {
  try {
    const [genCount, pubCount] = await Promise.all([
      contentGenerationQueue.getJobCounts(),
      contentPublishQueue.getJobCounts(),
    ]);
    return {
      generation: genCount,
      publish: pubCount,
      status: "healthy",
    };
  } catch (error) {
    return { status: "unhealthy", error: String(error) };
  }
}
