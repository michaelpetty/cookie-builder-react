import React, { useState } from 'react';
import { Modal, Form, Segment, Message, Button } from 'semantic-ui-react';

const LogIn = ({ handleInput, handleLogIn, handleSignUp, isModalOpen, authErr, closeLogin }) => {
	const [isLogin, setIsLogin] = useState(true);
	const switchLogin = (e) => {
		e.preventDefault();
		setIsLogin(!isLogin);
	}

	let loginError = !(!authErr.login);
	let registerError = !(!authErr.register);

	return (
		<div>
		<Modal
			open={isModalOpen}
			onClose={closeLogin}
			basic
			size='small'
		>
		{isLogin ? (
			<Modal.Content>
			<h2>Sign In</h2>
			<Form error={loginError} size='large'>
	        <Segment stacked>
						<Message error content={authErr.login} />
	          <Form.Input fluid icon='user' iconPosition='left' placeholder='E-mail address' name='email' onChange={handleInput} />
	          <Form.Input fluid icon='lock' iconPosition='left' placeholder='Password' type='password' name='password' onChange={handleInput} />
						<Form.Button fluid primary content='Sign In' onClick={handleLogIn} />
						<Button fluid compact size="tiny" content="Need to Register?" onClick={switchLogin} />
					</Segment>
				</Form>
			</Modal.Content>
		) : (
			<Modal.Content>
			<h2>Register</h2>
			<Form error={registerError} size='large'>
	        <Segment stacked>
						<Message error content={authErr.register} />
	          <Form.Input error={registerError} fluid icon='user' iconPosition='left' placeholder='E-mail address' name='email' onChange={handleInput} />
	          <Form.Input fluid icon='lock' iconPosition='left' placeholder='Password' type='password' name='password' onChange={handleInput} />
	          <Form.Input fluid icon='lock' iconPosition='left' placeholder='Confirm password' type='password' name='password2' onChange={handleInput} />
						<Form.Button fluid primary content='Register' onClick={handleSignUp} />
						<Button fluid compact size="tiny" content="Already have an account?" onClick={switchLogin} />
					</Segment>
				</Form>
			</Modal.Content>
		)}
		</Modal>
		</div>
	);
}

export default LogIn;
