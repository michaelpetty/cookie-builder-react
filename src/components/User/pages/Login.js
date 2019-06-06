import React from 'react';


const LogIn = ({ handleInput, handleLogIn }) => (
	<div>
		<h2>Log In</h2>
		<form>
			<div>
				<label htmlFor="email">Email</label>
				<input type="text" name="email" onChange={handleInput} />
			</div>
			<div>
				<label htmlFor="password">Password</label>
				<input type="password" name="password" onChange={handleInput} />
			</div>
			<input value="Submit" type="submit" onClick={handleLogIn} />
		</form>
	</div>
);

export default LogIn;
