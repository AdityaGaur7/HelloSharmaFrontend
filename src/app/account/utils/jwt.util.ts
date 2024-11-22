export function getJwtToken(): string | null {
    const userData = JSON.parse(localStorage.getItem('userData') || '{}');
    return userData.jwt || null;
  }