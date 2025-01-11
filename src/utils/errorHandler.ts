export const handleApiError = (error: any) => {
  console.error('API Error:', error);
  const message = error.message || '发生错误，请稍后重试';
  // 这里可以使用你的提示组件
  alert(message);
};