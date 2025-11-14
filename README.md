api/auth/register
post запит передаєм
{name:string до 16 символів,
email: string схожий на email до 128символів,
password: string від 8 до 128 символів,
}
у відповідь надходить статус 201 створюється сессія повертається об'єкт юзера, і кукі "accessToken", "refreshToken", "sessionId"
{
"email": "voronich97@gmail.ua",
"avatar": "https://ac.goit.global/fullstack/react/default-avatar.jpg",
"name": "yurii",
"\_id": "691488706a6f522f4e30d509",
"createdAt": "2025-11-12T13:15:28.821Z",
"updatedAt": "2025-11-12T13:15:28.821Z"
}
якщо емейл використовується приходить статус 409 і повідомлення : "Email in use"

api/auth/login
post запит передаєм
{
email: string схожий на email до 128символів,
password: string від 8 до 128 символів,
}
у відповідь надходить статус 200 створюється сессія повертається об'єкт юзера, і кукі "accessToken", "refreshToken", "sessionId"
{
"email": "voronich97@gmail.ua",
"avatar": "https://ac.goit.global/fullstack/react/default-avatar.jpg",
"name": "yurii",
"\_id": "691488706a6f522f4e30d509",
"createdAt": "2025-11-12T13:15:28.821Z",
"updatedAt": "2025-11-12T13:15:28.821Z"
}
якщо при логіні юзера не існує у бд або невірний пароль повертається 401 помлика

api/auth/logout приватний роут потребує передачі кукі
post запит без тіла запиту
у відповідь надходить статус 204 видаляється сессія і кукі "accessToken", "refreshToken", "sessionId"
якщо при запиті не передати кукі буде помлика 401 missing "accessToken"

api/auth/refresh роут для оновлення сесії потребує передачі кукі "refreshToken"
post запит без тіла запиту
у відповідь надходить статус 200 кукі "accessToken", "refreshToken", "sessionId" і повідомлення 'Session refreshed'
якщо при запиті сесія не буде знайдена поверне 401 і повідомлення "session not found"
якщо сплив термін життя рефреш токена поврне 401 і повідомлення "Session token expired"

api/users/me приватний роут потребує передачі кукі
get запит
повертає об'єкт юзера
{
"email": "voronich97@gmail.ua",
"avatar": "https://ac.goit.global/fullstack/react/default-avatar.jpg",
"name": "yurii",
"\_id": "691488706a6f522f4e30d509",
"createdAt": "2025-11-12T13:15:28.821Z",
"updatedAt": "2025-11-12T13:15:28.821Z"
}
якщо юзера не знайдено повертає 404 і повідомлення 'User not found'
якщо не предати кукі поверне 401 missing "accessToken"
якщо при запиті сесія не буде знайдена поверне 401 і повідомлення "session not found"
якщо сплив термін життя рефреш токена поврне 401 і повідомлення "Session token expired"

api/categories
get запит
повертає масив категорій
[
"Seafood",
"Lamb",
"Starter",
"Chicken",
"Beef",
"Dessert",
"Vegan",
"Pork",
"Vegetarian",
"Miscellaneous",
"Pasta",
"Breakfast",
"Side",
"Goat",
"Soup"
]

api/ingredients
get запит
повертає масив об'єктів інгрідієнтів відсортованих в алфавітному порядку
[
{
"_id": "640c2dd963a319ea671e37aa",
"name": "Squid",
"desc": "A type of cephalopod with a soft, cylindrical body and long tentacles, often used in seafood dishes such as calamari or grilled squid.",
"img": "https://ftp.goit.study/img/so-yummy/ingredients/640c2dd963a319ea671e37aa.png"
},
{
"_id": "640c2dd963a319ea671e37f5",
"name": "Cabbage",
"desc": "A leafy green or purple vegetable that is often used in salads, coleslaw, and stir-fry dishes, and is also commonly fermented into sauerkraut.",
"img": "https://ftp.goit.study/img/so-yummy/ingredients/640c2dd963a319ea671e37f5.png"
},
]
підтримує пошук передавати параметр search (string)

api/recipes
get запит
повертає масив рецептів з пагінацією
"page": 1,
"perPage": 12,
"total": 285,
"totalPages": 24,
"recipes": [
{
"\_id": "6462a8f74c3d0ddd288980d1",
"title": "Shakshuka",
"category": "Vegetarian",
"owner": "64c8d958249fae54bae90bb9",
"area": "Egyptian",
"instructions": "Heat the oil in a frying pan that has a lid, then soften the onions, chilli, garlic and coriander stalks for 5 mins until soft. Stir in the tomatoes and sugar, then bubble for 8-10 mins until thick. Can be frozen for 1 month.\r\n\r\nUsing the back of a large spoon, make 4 dips in the sauce, then crack an egg into each one. Put a lid on the pan, then cook over a low heat for 6-8 mins, until the eggs are done to your liking. Scatter with the coriander leaves and serve with crusty bread.",
"description": "A popular Middle Eastern dish with eggs poached in a spicy tomato sauce, with onions, bell peppers, and spices. Serve with crusty bread for a hearty and delicious meal.",
"thumb": "https://ftp.goit.study/img/so-yummy/preview/Shakshuka.jpg",
"time": "25",
"ingredients": [
{
"_id": "640c2dd963a319ea671e372c",
"name": "Olive Oil",
"desc": "A type of oil made from pressing whole olives, commonly used in cooking and as a salad dressing.",
"img": "https://ftp.goit.study/img/so-yummy/ingredients/640c2dd963a319ea671e372c.png",
"measure": "1 tbs"
},
{
"_id": "640c2dd963a319ea671e374e",
"name": "Red Onions",
"desc": "A type of onion that has a deep purple skin and a mild, sweet flavor. They are often used in salads, sandwiches, and as a topping for pizza.",
"img": "https://ftp.goit.study/img/so-yummy/ingredients/640c2dd963a319ea671e374e.png",
"measure": "2 chopped"
},
],
"createdAt": "2023-03-11T19:25:33.247Z",
"updatedAt": "2023-05-28T00:29:28.560Z"
},
]
підтримує пошук за категорією параметр 'category' валідні категорії тількі ті які існують у бд у випадку якщо передають невалідну категорію повертає 400 'invalid category'
підтримує пошук за інгрідієнтом параметр 'ingredient' якщо нема рецептів з інгрідієнтом повертає пустий масив
для реалізації пагінації використовувати параметри page perPage

api/recipes/:recipeId
get запит
повертає об'єкт з рецептом
{
"\_id": "6462a8f74c3d0ddd288980d1",
"title": "Shakshuka",
"category": "Vegetarian",
"owner": "64c8d958249fae54bae90bb9",
"area": "Egyptian",
"instructions": "Heat the oil in a frying pan that has a lid, then soften the onions, chilli, garlic and coriander stalks for 5 mins until soft. Stir in the tomatoes and sugar, then bubble for 8-10 mins until thick. Can be frozen for 1 month.\r\n\r\nUsing the back of a large spoon, make 4 dips in the sauce, then crack an egg into each one. Put a lid on the pan, then cook over a low heat for 6-8 mins, until the eggs are done to your liking. Scatter with the coriander leaves and serve with crusty bread.",
"description": "A popular Middle Eastern dish with eggs poached in a spicy tomato sauce, with onions, bell peppers, and spices. Serve with crusty bread for a hearty and delicious meal.",
"thumb": "https://ftp.goit.study/img/so-yummy/preview/Shakshuka.jpg",
"time": "25",
"ingredients": [
{
"name": "Olive Oil",
"desc": "A type of oil made from pressing whole olives, commonly used in cooking and as a salad dressing.",
"img": "https://ftp.goit.study/img/so-yummy/ingredients/640c2dd963a319ea671e372c.png",
"measure": "1 tbs"
},
{
"name": "Red Onions",
"desc": "A type of onion that has a deep purple skin and a mild, sweet flavor. They are often used in salads, sandwiches, and as a topping for pizza.",
"img": "https://ftp.goit.study/img/so-yummy/ingredients/640c2dd963a319ea671e374e.png",
"measure": "2 chopped"
},

    ],
    "createdAt": "2023-03-11T19:25:33.247Z",
    "updatedAt": "2023-05-28T00:29:28.560Z"

}
у випадку передачі невалідного id повертає 400 і повідомлення "Invalid recipe id"
якщо рецепт не знайдено у бд повертає 404 і повідомлення "Recipe not found"
