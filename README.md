# node-login-signup
User signup and login demo using nodejs and mongodb. Jsonwebtoken used for generating token for security. <br>
Use git clone or download the repository.
<bt><br>
run ```npm install``` from root directory <r>>
run ```npm start``` to start the app <br>
run ```npm test``` to run unit test <br>
# Libraries used
<ul>
   <li>express</li>
   <li>mongoose</li>
   <li>Jsonwebtoken</li>
   <li>bcrypt</li>
   <li>express-validator</li>
   <li>mongoose-unique-validator</li>
   <li>express-session</li>
   <li>mocho</li>
   <li>chai</li>
</ul>

# End points
1. <b>api/user/signup</b> <br/>
   parameters: <br/>
    a) first_name <br/>
    b) last_name <br/>
    c) email <br/>
    d) dob <br/>
    e) password <br/><br/>

2. <b>api/user/login</b> <br/>
   parameters: <br/>
    a) email <br/>
    b) password <br/>
