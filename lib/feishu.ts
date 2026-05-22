import axios from "axios";

export async function sendFeishu(message: string) {
  const webhookUrl = process.env.FEISHU_WEBHOOK_URL;

  if (!webhookUrl) {
    console.warn("飞书配置未完成");
    return;
  }

  try {
    await axios.post(webhookUrl, {
      msg_type: "text",
      content: {
        text: message,
      },
    });
  } catch (error) {
    console.error("飞书发送失败:", error);
  }
}
