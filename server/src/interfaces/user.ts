interface IUser {
  id: number
  username: string
  email: string
  password: string
  role: string
  image: string
  refresh_token: string
  created_at: Date
}

export default IUser;
