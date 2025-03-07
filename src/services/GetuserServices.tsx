// services/user.ts
export interface User {
  id: string | number;
  username: string;
  // Add other user properties as needed
}

export async function getUser(id: string | number): Promise<User> {
  try {
    const response = await fetch(`/api/users/${id}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const userData = await response.json();
    
    if (!userData.username) {
      throw new Error("User data is incomplete");
    }

    return userData;
  } catch (error) {
    throw new Error("Could not retrieve user information");
  }
}