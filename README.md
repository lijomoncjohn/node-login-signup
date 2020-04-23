# node-login-signup
User signup and login demo using nodejs and mongodb. Jsonwebtoken used for generating token for security. <br>
Use git clone or download the repository.
<bt><br>
run ```npm install``` from root directory

# Libraries used
<ul>
   <li>express</li>
   <li>mongoose</li>
   <li>Jsonwebtoken</li>
   <li>bcrypt</li>
   <li>express-validator</li>
   <li>mongoose-unique-validator</li>
</ul>

# API end points
1. <b>api/user/signup</b> <br/>
   parameters: <br/>
    a) first_name <br/>
    b) last_name <br/>
    c) email <br/>
    d) dob <br/>
    e) password <br/><br/>

1. <b>api/user/login</b> <br/>
   parameters: <br/>
    a) email <br/>
    b) password <br/>
