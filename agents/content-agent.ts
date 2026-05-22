import { openai } from "../lib/openai";

// 内容生成智能体
export class ContentAgent {
  // 生成文章内容
  async generateArticle(keyword: string) {
    try {
      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "你是专业的内容创作助手" },
          { role: "user", content: `围绕关键词 ${keyword} 创作一篇优质文章` }
        ],
        temperature: 0.7
      });
      return response.choices[0].message.content || "生成失败";
    } catch (error) {
      console.error("内容生成失败", error);
      return "生成异常";
    }
  }
}
