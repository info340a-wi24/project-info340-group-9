import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../index.css';
import {
    Container,
    FormGroup,
    Label,
    Input,
    Button,
    Alert,
} from 'reactstrap';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from './Config';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, onAuthStateChanged, signOut } from 'firebase/auth'
import { NavLink, Navigate } from 'react-router-dom';

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export function Auth() {

    const [user, setUser] = useState(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isNewUser, setIsNewUser] = useState(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
                setEmail('');
                setPassword('');
                setUsername('');
                setErrorMessage('')
            } else {
                setUser(null);
            }
        });
        return () => unsubscribe();
    }, []);

    const handleChange = (event) => {
        const { name, value } = event.target;
        if (name === 'email') setEmail(value);
        else if (name === 'password') setPassword(value)
        else if (name === 'username') setUsername(value);
    }

    const handleSignUp = async () => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            await updateProfile(userCredential.user, { displayName: username});
            setUsername('');
            setUser(userCredential.user);
        }
        catch (error) {
            setErrorMessage(error.message);
        }
    }

    const handleSignIn = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (error) {
            setErrorMessage(error.message);
        }
    }

    const handleSignOut = async () => {
        try {
            await signOut(auth);
            setEmail('');
            setPassword('');
            setUsername('');
        } catch (error) {
            setErrorMessage(error.message);
        }
    }

    const handleNew = () => {
        setIsNewUser(!isNewUser);
    }

    const welcomeDiv = isNewUser ? <h1>Create an account with your UW email</h1> : <h1>Sign in with your UW email</h1>
    
    const errorDiv = errorMessage === "" ? "" : <Alert color='danger'>Error: {errorMessage}</Alert>

    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@uw\.edu$/;
        return emailRegex.test(email);
    };

    const isNotReadytoSubmit = !isValidEmail(email) || password === '';

    return (
        
        <Container>
        {user && <Navigate to="/" />}
          {welcomeDiv}
          {isNewUser ? <FormGroup floating>
            <Input
            id="username"
            name="username"
            placeholder="Username"
            value={username}
            onChange={(event) => handleChange(event)}
            />
            <Label>Username</Label>
      </FormGroup> : (null)}
          <FormGroup floating>
          <Input
              id="email"
              type="email"
              name="email"
              placeholder="Email"
              valid={isValidEmail(email)}
              invalid={!isValidEmail(email)}
              value={email}
              onChange={(event) => handleChange(event)}
            />
            <Label for="email">Email</Label>
          </FormGroup>
    
          <FormGroup floating>
            <Input
              id="password"
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={(event) => handleChange(event)}
            />
            <Label>Password</Label>
          </FormGroup>

        {isNewUser ? (
          <FormGroup>
            <h2></h2>
            <Button color="primary" className="mr-2" onClick={handleSignUp} disabled={isNotReadytoSubmit}>
              Sign Up
            </Button>
            <p>Already have an account?</p>
            <NavLink>
                <Button onClick={handleNew}>Sign In</Button>
            </NavLink>
            </FormGroup>
        ) : (
            <FormGroup>
            <Button color="primary" className="mr-2" onClick={handleSignIn} disabled={isNotReadytoSubmit}>
              Sign In
            </Button>
            <p>Don't have an account?</p>
            <NavLink>
                <Button onClick={handleNew}>Sign Up</Button>
            </NavLink>
            </FormGroup>
        )}
        {errorDiv}
        </Container>
      );
    }