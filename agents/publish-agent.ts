import { sendFeishu } from "../lib/feishu";
import { sendTelegram } from "../lib/telegram";

// 发布智能体
export class PublishAgent {
  // 多平台发布内容
  async publishContent(content: string) {
    try {
      // 同步发布到飞书
      await sendFeishu(`新内容发布：\n${content}`);
      // 同步发布到Telegram
      await sendTelegram(`新内容发布：\n${content}`);
      return true;
    } catch (error) {
      console.error("发布失败", error);
      return false;
    }
  }
}
