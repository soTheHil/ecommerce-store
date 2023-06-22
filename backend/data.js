import bcrypt from "bcrypt"

const data = {
    products:[
        {
            id: 0,
            title: 'Burger Combo',
            price: 80,
            description: 'Cheese burger with bacon, large chips, and 200ml soda',
            url: 'burger-combo.jpg'
        },
        {
            id: 1,
            title: 'Ham Burger',
            price: 70,
            description: 'Cheese burger with bacon, large chips, and 200ml soda',
            url: 'ham-burger.jpg'
        }
        ,
        {
            id: 2,
            title: 'Mozarella Pizza With Cheese And Feta',
            description: 'Medium size pizza',
            price: 180,
            url: 'mozarella-pizza.jpg'
        }
        ,
        {
            id: 3,
            title: 'Olive Pizza',
            price: 190,
            description: 'Medium size pizza',
            url: 'olive-pizza.jpg'
        }
    ],
    users: [
        {
            name: 'Jack',
            email: 'jack@gmail.com',
            password: bcrypt.hashSync('yesman', 10)
        },
        {
            name: 'Sohil',
            email: 'sohil@yahoo.com',
            password: bcrypt.hashSync('future', 10)
        }
    ]
}

export default data