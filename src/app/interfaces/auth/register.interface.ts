import { UserType } from "@interfaces/shared.interface";

export interface RegisterDTO {
  email: string;
  password: string;
  name: string;
  type: UserType
}
