import styled from 'styled-components';

export const FormContainer = styled.div`
    margin-left: 50px;
    display: flex;
    justify-content: center;
    padding-top: 100px;
    position: relative;
    background-image: url('registerBackdrop.jpg');
    background-size: cover;
    height: 93vh;
`;
export const Overlay = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
`;

export const MainContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #121212;
    width: 500px;
    padding: 80px;
    height : 700px;
`;

export const InputContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

export const Input = styled.input`
    margin-top: 12px;
    background-color: black;
    color: white;
    border-radius: 5px;
    border: 1px solid white;
    width: 300px;
    height : 50px;
    &::placeholder {
        font-size: 16px;
    }
`;

export const Button = styled.button`
    margin-top: 12px;
    border: 1px solid #BB2D3B;
    background-color: black;
    color: #BB2D3B;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height : 50px;
    &:hover {
        color: white;
        background-color: #BB2D3B;
    }
`;

export const ImageContainer = styled.img`
    height: 700px;
    width: 500px;
`;

export const HorizontalLine = styled.div`
    width: 130px;
    height: 1px;
    background-color: #ccc;
    margin: 10px 10px;
`;

export const RegisterContainer = styled.button`
    width: 300px;
    background-color: #BB2D3B;
    color: white;
    border: 1px solid #BB2D3B;
    height : 50px;
    &:hover {
        opacity: 85%;
    }
`;
