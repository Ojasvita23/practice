export interface UserInterface {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  imageUrl: string;
  age: number;
  gender: string;
  address: {
    address: string;
    city: string;
    state: string;
    country: string;
  }
}