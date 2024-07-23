import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import UserService from '../../services/users';
import Input from 'components/Input/Input';
import type IUser from 'interfaces/user';

const User = (): JSX.Element => {
  const [userProfile, setUserProfile] = useState<IUser>();
  const [values, setValues] = useState({
    username: '',
    email: ''
  });

  const navigate = useNavigate();
  const location = useLocation();

  const username = location.pathname.split('/')[2];

  const handleChange = (event: React.FormEvent): void => {
    const target = event.target as HTMLInputElement;

    setValues({ ...values, [target.name]: target.value });
    // setInputs((previous) => ({ ...previous, [event.target.name]: event.target.value }))
  };

  const inputs = [
    {
      id: 1,
      name: 'username',
      type: 'text',
      placeholder: 'Username',
      errorMessage: 'Username should be 3-16 characters and shouldn\'t include any special character!',
      label: 'Username',
      pattern: '^[A-Za-z0-9]{3,16}$',
      required: true
    },
    {
      id: 2,
      name: 'email',
      type: 'email',
      placeholder: 'Email',
      errorMessage: 'It should be a valid email address!',
      label: 'Email',
      required: true
    },
    {
      id: 3,
      name: 'password',
      type: 'password',
      placeholder: 'Password',
      errorMessage: 'Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!',
      label: 'Password',
      pattern: '^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$',
      required: true
    }
  ];

  useEffect(() => {
    const fetchUser = async (): Promise<void> => {
      try {
        const userData = await UserService.getUser(username);
        setUserProfile(userData);
        console.log(userData);
      } catch (error) {
        console.log(error);

        navigate('*');
      }
    };

    fetchUser();
  }, []);

  return (
  // section tag
      <div>
          Profile
          { (userProfile !== null) &&
          <>
            <form action="">
              <img src={userProfile?.image ?? undefined} alt="User avatar" />
              { userProfile?.role === 'admin' ? 'Administrator' : 'User' }
              {inputs.map((input) => (
                <Input key={input.id} {...input} value={input.name === 'username' ? userProfile?.username : userProfile?.email} onChange={handleChange} />
              ))}
              <button type='submit'>Update</button>
            </form>
            <div>
              <span>
                {/* red color */}
                Delete account
              </span>
            </div>
          </>
          }
            <div>user-personal.tsx ? / single-user/ userprofile / profile (Personal user information, personal user page) opportunity to upload photo</div>
      </div>
  );
};

export default User;

// const UserProfile = () => {
//   const [avatar, setAvatar] = useState('');

//   return (
//     <section className="user-profile">
//       <div className="container user-profile__container">

//         <div className="user-profile__details">
//           <div className="avatar-wrapper">
//             <div className="user-profile__avatar">
//               <Image src="https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg" alt="Author avatar" width={500} height={150} />
//             </div>
//           </div>
//           <form action="" className="avatar-form">
//             <input type="file" name='avatar' id='avatar' onChange={event => setAvatar(event.target.files[0])} accept='png, jpg, jpeg'/>
//             <label htmlFor="avatar">
//               {/* where will be small icon to update avatar */}
//             </label>
//           </form>
//           <button className="user-profile__button">
//             {/* Check icon here */}
//           </button>
//           <h1>Test Testov</h1>
//           <form action="" className="form user-profile__form">
//             <p className="form__error-message">This is an error message</p>
//             <input type="text" placeholder="Test"/>
//             <input type="text" placeholder="Test"/>
//             <input type="text" placeholder="Test"/>
//             <input type="text" placeholder="Test"/>
//             <button className="button primary">Update details</button>
//           </form>
//         </div>
//       </div>
//     </section>
//   );
// };
