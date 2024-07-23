interface IUser {
  id: number
  username: string
  email: string
  token: string
  role: string
  image: string | null
  created_at: Date
};

export default IUser;
