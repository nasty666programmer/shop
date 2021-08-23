module.exports = function(email) {
    return {
        
            from: 'dev18ivanov@gmail.com',
            to: email,
            subject: 'Registration is Success',
            text: 'Welcome!',
            html:`
                <h1>Вы успешно заругестрировались в нашем интернет-магазине</h1>
                <span><a href='http://localhost:3000'>Наш магазин</>a</span>
                `
         
      };
}