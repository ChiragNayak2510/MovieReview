import React, { useState } from 'react';
import api from '../../api/axiosConfig.js';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BeatLoader from 'react-spinners/BeatLoader';
import { FormContainer, MainContainer, Overlay, Input, FileInput, ImagePlaceholder, Button, InputContainer, ImageContainer } from "../styledComponents/RegisterStyledComponent.js";
import { useNavigate } from 'react-router-dom';
import useCurrentUserStore from '../../store/useStore.js';
import useSignIn from 'react-auth-kit/hooks/useSignIn';
const Register = () => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [isLoading,setIsLoading] = useState(false)
  const signIn = useSignIn()
  const setCurrentUser = useCurrentUserStore((state) => state.setCurrentUser);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!name || !username || !email || !password || !profileImage){
        toast.error('All fields are mandatory');
        return;
    }
    const userData = {
      name : name,
      username: username,
      email: email,
      password: password,
      profileImage: profileImage // Assuming profileImage is a File object or a base64 string
    };

    try {
      setIsLoading(true);
      const response = await api.post('api/v1/auth/register', userData);
      const userResponse = await api.post('/api/v1/auth',{
        token : response.data.token
      })
      signIn({
        auth: {
            token: response.data.token,
            type: 'Bearer'
        },
        userState: username
    });
      setCurrentUser(userResponse.data)
      setIsLoading(false)
      toast.success('User created successfully');
      navigate('/')
       // Display success toast
    } catch (error) {
      console.error('Error occurred:', error);
      toast.error('User already exists'); // Display error toast
    }
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      // Set the base64 string as the profileImage state
      setProfileImage(reader.result);
    };

    // Read the file as a data URL (base64 string)
    reader.readAsDataURL(file);
  }

  return (
    <FormContainer>
      <Overlay />
      <MainContainer>
        {isLoading && (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <BeatLoader size={15} color={'#BB2D3B'} loading={isLoading} />
          </div>
        )}
        {!isLoading && (
          <>
            <h3>Create a new account</h3>
            <form onSubmit={handleSubmit}>
              <InputContainer>
              <Input type="text" placeholder="Enter name" value={name} onChange={(e) => setName(e.target.value)} />
                <Input type="text" placeholder="Enter username" value={username} onChange={(e) => setUsername(e.target.value)} />
                <Input type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <Input type="password" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <ImageContainer>
                  <ImagePlaceholder htmlFor="myfile">Choose your avatar</ImagePlaceholder>
                  <FileInput id="myfile" type="file" accept="image/*" onChange={handleFileChange} />
                </ImageContainer>
              </InputContainer>
              <Button type="submit">Register</Button>
            </form>
          </>
        )}
      </MainContainer>
    </FormContainer>
  );

}

export default Register;
