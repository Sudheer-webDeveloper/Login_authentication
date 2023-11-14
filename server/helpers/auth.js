const bcrypt = require('bcrypt');

const hashingPassword = (password) =>{
      return new Promise((resolve,reject)=>{
        bcrypt.genSalt(12,(err,salt)=>{
            if(err){
                reject("If any error in gen salt",salt)
            }
            console.log("The salt is here", salt)
            bcrypt.hash(password,salt,(err,hash)=>{
                if(err){
                    reject("If any err while gen hash pass with salt",err)
                }
                resolve(hash) // if no error ,This returns the hashed passoword
                console.log("hashed password", hash)
            })
        })
      })
}

const comparePassword =(password,hashedPassoword)=>{
    return bcrypt.compare(password,hashedPassoword)
}



module.exports = {
    hashingPassword,comparePassword
}












/*

Certainly! This function uses the `bcrypt` library to hash a given password.

```javascript
const hashedPassword = (password) => {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(12, (err, salt) => {
      if (err) {
        reject("got error", err); // If an error occurs during salt generation, reject with an error message and the error object
      }
      bcrypt.hash(password, salt, (err, hash) => {
        if (err) {
          reject(err, "error"); // If an error occurs during hashing, reject with the error object and an "error" string
        }
        resolve(hash); // Resolve with the generated hash
      });
    });
  });
};
```

Explanation of each line and its purpose:

1. `const hashedPassword = (password) => { ... }`: Defines a function called `hashedPassword` that takes a `password` parameter.
2. `return new Promise((resolve, reject) => { ... })`: Creates a new Promise that takes two functions as arguments: `resolve` and `reject`. This Promise handles the asynchronous nature of generating a salt and hashing the password.
3. `bcrypt.genSalt(12, (err, salt) => { ... })`: Generates a salt using `bcrypt`. The `12` is the cost factor, determining the complexity of the hashing. The higher the number, the more computational work is needed to generate the hash.
4. `if (err) { reject("got error", err); }`: If an error occurs during salt generation, the `reject` function is called, rejecting the Promise with an error message and the error object.
5. `bcrypt.hash(password, salt, (err, hash) => { ... })`: Hashes the `password` using the generated `salt`.
6. `if (err) { reject(err, "error"); }`: If an error occurs during hashing, the `reject` function is called, rejecting the Promise with the error object and an "error" string.
7. `resolve(hash);`: If no errors occur, the `resolve` function is called with the generated `hash`, fulfilling the Promise.

In real-life terms, imagine a password as a physical document. Hashing the password would be akin to converting this document into a complex code that's unreadable without a key. The `bcrypt` library generates a unique "key" (the salt) and then converts the password (document) into a scrambled, unreadable format (the hash) using this key. If you later want to verify a password, you can re-hash the provided password with the same salt and compare it to the stored hash; if they match, the password is correct.











Absolutely! Let's break it down:

**Salt**: Think of "salt" as a special ingredient you add to your recipe to make it unique. In password security, it's like adding a secret sauce to your password before cooking it. This "sauce" (salt) is a random string of characters generated specifically for each password. It's added to the password before it gets converted into an unreadable format (the hash). Just as different dishes can have different secret sauces, each password gets its unique "sauce" (salt). This uniqueness makes it much harder for someone trying to crack passwords because they can't use precomputed tables (like a list of commonly used passwords) to easily figure out what the original password was.

**Hash**: Imagine you have a magical machine that takes something and turns it into a jumbled, unrecognizable mess. That's what a hash does to a password. It takes the password (with its added "sauce" of salt) and scrambles it into a unique, fixed-size string of characters. This scrambled version is practically impossible to reverse back to the original password because of the complexity of the process. It's like turning a beautiful painting into a pile of randomly mixed colors; you can't easily recreate the original masterpiece from the mixed colors.

In simpler terms, a salt is a unique addition to your password before it's transformed into a scrambled version called a hash. This transformation makes it incredibly difficult for someone to figure out the original password, even if they get access to the hashed version. The salt ensures each password has its own unique "flavor," and the hash turns the password into a jumbled mess that's practically impossible to unscramble. This helps keep passwords secure, even if someone gains access to the stored hashed versions.




const hashedPassword = async (password) => {
  try {
    const salt = await new Promise((resolve, reject) => {
      bcrypt.genSalt(12, (err, salt) => {
        if (err) {
          reject(err); // Reject with the error object
        }
        resolve(salt); // Resolve with the generated salt
      });
    });

    const hash = await new Promise((resolve, reject) => {
      bcrypt.hash(password, salt, (err, hash) => {
        if (err) {
          reject(err); // Reject with the error object
        }
        resolve(hash); // Resolve with the generated hash
      });
    });

    return hash; // Return the final hash
  } catch (error) {
    throw error; // Throw any errors encountered during the process
  }
};













const comparePassword = (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword);
};


    const comparePassword = (password, hashedPassword) => { ... }: Defines a function named comparePassword that takes two parameters: password (plain text) and hashedPassword (the hashed password).

    return bcrypt.compare(password, hashedPassword);: This line uses bcrypt's compare method. It takes the password and the hashedPassword as arguments and returns a Promise.

The bcrypt.compare() function performs the comparison of the provided password against the stored hashed password. It internally handles the process of re-hashing the provided password with the salt extracted from the stored hashed password and then comparing the newly generated hash with the stored hash.

    If the provided password matches the hashed password, bcrypt.compare() returns true.
    If the provided password does not match the hashed password, it returns false.

This function is valuable for verifying user passwords during authentication. When a user tries to log in, their entered password can be compared against the stored hashed password in the database. If they match, it means the user provided the correct password. This helps ensure security because even if someone gains access to the hashed passwords, they can't reverse-engineer the actual password from the hash. The bcrypt.compare() method handles this comparison securely without exposing sensitive information.
User
where did the stored hashed password comes from here
ChatGPT

In the comparePassword function provided earlier, the hashedPassword parameter is expected to be the hashed version of the user's password that's typically retrieved from a storage system like a database.

For instance, during the user registration process, when a user creates an account and sets a password, that password is hashed using a function like hashedPassword() that employs bcrypt or a similar hashing algorithm. The resulting hashed password is then stored in a database associated with that user's account.

Later, during the login process, when the user attempts to log in by entering their password, the system retrieves the previously stored hashed password associated with the user's account from the database. This retrieved hashed password is then used as the hashedPassword argument when calling the comparePassword() function to verify if the entered password matches the stored hashed password.

So, the hashedPassword parameter in the comparePassword function is the previously stored hashed password retrieved from the database for the specific user attempting to log in.







*/