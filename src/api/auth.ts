// 模擬 API 呼叫
export const loginUser = (username: string, password: string): Promise<{ access_token: string }> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (username === 'test' && password === 'password') {
        resolve({ access_token: 'fake_jwt_token_string' });
      } else {
        reject(new Error('Invalid credentials'));
      }
    }, 1500); // 模擬 1.5 秒的網路延遲
  });
};
