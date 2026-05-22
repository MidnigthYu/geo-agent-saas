// 通用工具函数
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  }).format(date);
}

// 生成随机ID
export function generateId(): string {
  return Math.random().toString(36).substring(2, 15);
}
