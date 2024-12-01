export function getJwtToken(): string | null {
    const userData = JSON.parse(localStorage.getItem('HSLocalStorage') || '{}');
    return userData.jwt || null;
  }