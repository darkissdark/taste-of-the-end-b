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
повертає масив об'єктів інгрідієнтів
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
