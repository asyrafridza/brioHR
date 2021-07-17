export type ISODate = string;

export interface Job {
  id: string;
  title: string;
  location: string;
  department: string;
  level?: string;
  createdAt: ISODate;
  updatedAt: ISODate;
}
