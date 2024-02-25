import React from 'react';
import './Register.css'

const Register = () => {
    const handleSubmit = () => {
        // Add your form submission logic here
    };

    return (
        <div className='form-container'>
            
            <img className='image-container' src="halo.jpg" alt="welcome image" />
            <div className='main-container'>
            <h3 style={{display : "flex", justifyContent : 'center',alignItems:'center'}}>Register</h3>
            <form onSubmit={handleSubmit}>
                <div className='input-container'>
                <input type="text" className='username-container'placeholder='Enter username'/>
                <input type="password" className='password-container'placeholder='Enter password'/>
                </div>
                    <button type="submit" className='button-container'>
                        Login
                    </button>
            </form>
            <div style={{display : "flex",marginTop : "10px"}}>
            <div class="horizontal-line"></div>
            <p>OR</p>
            <div class="horizontal-line"></div>
            </div>
            <button type="submit" className='register-container'>
                        Create a new account
            </button>
            </div>
        </div>
    );
};

export default Register;
