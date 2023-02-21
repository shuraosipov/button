import React, { useState, useEffect, useRef } from 'react';

const ColorChangingButton = ({ buttonLabel }) => {
  const [isPressed, setIsPressed] = useState(false);
  const [password, setPassword] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  const passwordRef = useRef(null);

  const handleClick = () => {
    setIsPressed(!isPressed);

    const generatePassword = (length) => {
      const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      const lowercase = 'abcdefghijklmnopqrstuvwxyz';
      const numbers = '0123456789';
      const symbols = '!@#$%^&*()_+~`|}{[]\:;?><,./-=';

      const allChars = uppercase + lowercase + numbers + symbols;

      let password = '';
      for (let i = 0; i < length; i++) {
        const index = Math.floor(Math.random() * allChars.length);
        password += allChars[index];
      }
      return password;
    };

    const generatedPassword = generatePassword(12);
    setPassword(generatedPassword);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(password);
    setIsCopied(true);
  };

  useEffect(() => {
    let timer;
    if (isCopied) {
      timer = setTimeout(() => setIsCopied(false), 2000);
    }
    return () => clearTimeout(timer);
  }, [isCopied]);

  const buttonColor = isPressed ? '#FF5722' : '#2196F3';
  const buttonStyles = {
    backgroundColor: buttonColor,
    color: '#fff',
    padding: '10px 20px',
    borderRadius: '5px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '18px',
    fontWeight: 'bold',
  };

  const containerStyles = {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100vh',
  };

  const passwordStyles = {
    padding: '50px 20px',
    fontSize: '24px',
    fontWeight: 'bold',
    textDecoration: 'none',
  };

  const messageStyles = {
    position: 'absolute',
    top: passwordRef.current ? passwordRef.current.offsetTop + passwordRef.current.offsetHeight / 2 : 0,
    left: passwordRef.current ? passwordRef.current.offsetLeft + passwordRef.current.offsetWidth + 10 : 0,
    transform: 'translateY(-50%)',
    backgroundColor: '#48cc14',
    color: '#fff',
    padding: '10px 20px',
    borderRadius: '10px',
    boxShadow: '0 0 5px rgba(0, 0, 0, 0.3)',
    display: isCopied ? 'block' : 'none',
  };

  return (
    <div style={containerStyles}>
      
      <button style={buttonStyles} onClick={handleClick}>
        {buttonLabel}
      </button>
    
      <div></div>

      {password && (
        <>
          <div style={passwordStyles} onClick={handleCopy} ref={passwordRef}>
            {password}
          </div>
          <div style={messageStyles}>Copied</div>
        </>
      )}
      
    </div>
  );
};

export default ColorChangingButton;
