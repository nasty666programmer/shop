module.exports = function(email) {
    return {
        
            from: 'dev18ivanov@gmail.com',
            to: email,
            subject: 'Подтвердите заказ',
            text: 'Нашёлся покупатель!',
            html:`
                <h1>Подтвердите то, что вы продаёте свой товар.Перейдите по ссылке ниже </h1>
                <span><a href='http://localhost:3000/verify-sale'>Подтвердить</>a</span>
                `
         
      };
}