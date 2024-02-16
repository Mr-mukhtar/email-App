import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';

const ComposeEmail = () => {
  const [to, setTo] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const handleSend = () => {
    // Implement send email functionality
    console.log('Sending email...');
    console.log('To:', to);
    console.log('Subject:', subject);
    console.log('Message:', message);
    // Reset form fields after sending email
    setTo('');
    setSubject('');
    setMessage('');
  };

  return (
    <Container>
      <div>
        <div style={{ position: 'relative', margin: '15px' }}>
          <label style={{ marginRight: '10px' }} htmlFor='to'>
            To{' '}
          </label>
          <input
            label='to'
            type='text'
            id='to'
            placeholder='test@gmail.com'
            style={{
              border: 'none',
              borderBottom: 'none',
              outline: 'none',
            }}
            value={to}
            onChange={(e) => setTo(e.target.value)}
          />
          <span
            style={{
              position: 'absolute',
              top: '0',
              right: '0',
              padding: '5px',
              color: 'gray',
              fontSize: '16px',
            }}
          >
            Cc Bcc
          </span>
        </div>
        <hr />
      </div>
      <div>
        <input
          type='text'
          id='subject'
          placeholder='Subject'
          style={{
            border: 'none',
            borderBottom: 'none',
            outline: 'none',
            margin: '10px',
          }}
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
      </div>{' '}
      <hr />
      <div>
        <textarea
          id='message'
          rows='4'
          style={{
            border: 'none',
            borderBottom: 'none',
            outline: 'none',
            resize: 'none',
          }}
          placeholder='This is a test message'
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        ></textarea>
      </div>
      <button
        style={{
          backgroundColor: 'lightblue',
          borderColor: 'lightblue',
          color: '#fff',
          borderRadius: '20px', // round border
          padding: '10px 20px', // added padding
          marginRight: '10px', // added margin for spacing
        }}
        onClick={handleSend}
      >
        Send
      </button>
    </Container>
  );
};

export default ComposeEmail;
