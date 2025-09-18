export default function authHeader() {
  const userStr = localStorage.getItem("user");
  
  if (userStr) {
    const user = JSON.parse(userStr);
    if (user && user.access) {
      return `Bearer ${user.access}`;
    }
  }
  
  return null;
} 