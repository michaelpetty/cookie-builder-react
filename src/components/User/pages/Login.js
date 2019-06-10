import React from 'react';
import { Modal, Form, Segment } from 'semantic-ui-react';

const LogIn = ({ handleInput, handleLogIn, modalOpen, closeLogin }) => (
	<div>
	<Modal
		open={modalOpen}
		onClose={closeLogin}
		basic
		size='small'
	>
		<Modal.Content>
		<h2>Log In</h2>
		<Form size='large'>
        <Segment stacked>
          <Form.Input fluid icon='user' iconPosition='left' placeholder='E-mail address' name='email' onChange={handleInput} />
          <Form.Input fluid icon='lock' iconPosition='left' placeholder='Password' type='password' name='password' onChange={handleInput} />
					<Form.Button position="right" content='Login' onClick={handleLogIn} />
				</Segment>
			</Form>
		</Modal.Content>
	</Modal>
	</div>
);

export default LogIn;
