//INTERFAZ
export interface Video {
  description: string;
  title: string;
  url: string;
  updatedAt?: string | Date;
  createdAt?: string | Date;
  _id?: string;
}