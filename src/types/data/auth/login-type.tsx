interface SuccessLoginItemShape {
  id: number;
  name: string | number;
  token: string;
  userName: string;
  firstName: string;
  lastName: string;
  sectionId: string;
  bio: string;
  dateNow: string;
  lisence: string | null;
}

export type LoginItemShape = SuccessLoginItemShape | null;
