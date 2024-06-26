export interface rawDataType {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    profilePic: string;
    is_online: boolean
  }
export interface tableHead {
    name: string;
    email: string;
    img: string;
    online: boolean;
    friendsId: string
}
export interface userType {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  profilePic: string;
}
//   export type { rawDataType as rawDataType }