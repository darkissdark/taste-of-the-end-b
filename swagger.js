// swagger.js
// Swagger/OpenAPI documentation for your Express API

import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Taste of the End API',
      version: '1.0.0',
      description:
        'API documentation for authentication, categories, ingredients and recipes.',
    },
    components: {
      securitySchemes: {
        cookieAuth: {
          type: 'apiKey',
          in: 'cookie',
          name: 'accessToken',
        },
      },
    },

    paths: {
      '/api/auth/register': {
        post: {
          summary: 'Register new user',
          tags: ['Auth'],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['name', 'email', 'password'],
                  properties: {
                    name: { type: 'string', maxLength: 16, example: 'John' },
                    email: {
                      type: 'string',
                      format: 'email',
                      maxLength: 128,
                      example: 'user@mail.com',
                    },
                    password: {
                      type: 'string',
                      minLength: 8,
                      maxLength: 128,
                      example: 'strongPass123',
                    },
                  },
                },
              },
            },
          },
          responses: {
            201: {
              description: 'User created',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      email: { type: 'string', example: 'test@test.com' },
                      avatar: {
                        type: 'string',
                        example:
                          'https://ac.goit.global/fullstack/react/default-avatar.jpg',
                      },
                      createdAt: {
                        type: 'string',
                        format: 'date-time',
                        example: '2025-11-11T18:33:45.468Z',
                      },
                      updatedAt: {
                        type: 'string',
                        format: 'date-time',
                        example: '2025-11-11T18:33:45.468Z',
                      },
                      name: { type: 'string', example: 'Yurii' },
                    },
                  },
                },
              },
            },
            409: { description: 'Email in use' },
            400: { description: 'Validation error' },
          },
        },
      },

      '/api/auth/login': {
        post: {
          summary: 'Login user',
          tags: ['Auth'],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['email', 'password'],
                  properties: {
                    email: {
                      type: 'string',
                      format: 'email',
                      example: 'user@mail.com',
                    },
                    password: {
                      type: 'string',
                      minLength: 8,
                      maxLength: 128,
                      example: 'strongPass123',
                    },
                  },
                },
              },
            },
          },
          responses: {
            200: {
              description: 'User successfully logged in',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      email: { type: 'string', example: 'test@test.com' },
                      avatar: {
                        type: 'string',
                        example:
                          'https://ac.goit.global/fullstack/react/default-avatar.jpg',
                      },
                      createdAt: {
                        type: 'string',
                        format: 'date-time',
                        example: '2025-11-11T18:33:45.468Z',
                      },
                      updatedAt: {
                        type: 'string',
                        format: 'date-time',
                        example: '2025-11-11T18:33:45.468Z',
                      },
                      name: { type: 'string', example: 'Yuri' },
                    },
                  },
                },
              },
            },
            401: { description: 'Invalid credentials' },
            400: { description: 'Validation error' },
          },
        },
      },
      '/api/auth/logout': {
        post: {
          summary: 'Logout user',
          tags: ['Auth'],
          security: [{ cookieAuth: [] }],
          responses: {
            204: { description: 'no-content' },
          },
        },
      },
      '/api/auth/refresh': {
        post: {
          summary: 'Refresh user session',
          tags: ['Auth'],
          security: [{ cookieAuth: [] }],
          responses: {
            200: {
              description: 'Session refresh result',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      authorized: { type: 'boolean', example: true },
                      message: { type: 'string', example: 'Session refreshed' },
                    },
                  },
                },
              },
            },
          },
        },
      },
      '/api/categories': {
        get: {
          summary: 'Get all categories',
          tags: ['Categories'],
          responses: { 200: { description: 'List of categories' } },
        },
      },
      '/api/ingredients': {
        get: {
          summary: 'Get ingredients list',
          tags: ['Ingredients'],
          parameters: [
            {
              name: 'search',
              in: 'query',
              required: false,
              schema: { type: 'string', example: 'Sugar' },
              description: 'Filter ingredients by name',
            },
          ],
          responses: {
            200: {
              description: 'List of ingredients',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        _id: {
                          type: 'string',
                          example: '64f7b3c2a1b2c3d4e5f6g7h8',
                        },
                        name: { type: 'string', example: 'Sugar' },
                        desc: {
                          type: 'string',
                          example:
                            'Fruit with a soft, velvety skin and a sweet, juicy flesh, commonly eaten fresh or dried.',
                        },
                        img: {
                          type: 'string',
                          example:
                            'https://ftp.goit.study/img/so-yummy/ingredients/640c2dd963a319ea671e37bf.png',
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      '/api/recipes': {
        get: {
          summary: 'Get all recipes',
          tags: ['Recipes'],
          parameters: [
            {
              name: 'page',
              in: 'query',
              schema: { type: 'integer', default: 1 },
              description: 'Page number',
            },
            {
              name: 'perPage',
              in: 'query',
              schema: { type: 'integer', default: 12, maximum: 20 },
              description: 'Recipes per page',
            },
            {
              name: 'category',
              in: 'query',
              schema: { type: 'string' },
              description: 'Filter by category',
            },
            {
              name: 'ingredient',
              in: 'query',
              schema: { type: 'string' },
              description: 'Filter by ingredient name',
            },
            {
              name: 'search',
              in: 'query',
              schema: { type: 'string' },
              description: 'Search by title',
            },
          ],
          responses: {
            200: {
              description: 'Recipes fetched with pagination',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      page: { type: 'integer', example: 1 },
                      perPage: { type: 'integer', example: 12 },
                      total: { type: 'integer', example: 100 },
                      totalPages: { type: 'integer', example: 9 },
                      recipes: {
                        type: 'array',
                        items: {
                          type: 'object',
                          properties: {
                            _id: {
                              type: 'string',
                              example: '6462a8f74c3d0ddd288980d1',
                            },
                            title: { type: 'string', example: 'Shakshuka' },
                            category: { type: 'string', example: 'Vegetarian' },
                            owner: {
                              type: 'string',
                              example: '64c8d958249fae54bae90bb9',
                            },
                            area: { type: 'string', example: 'Egyptian' },
                            description: {
                              type: 'string',
                              example:
                                'A popular Middle Eastern dish with eggs poached in a spicy tomato sauce...',
                            },
                            thumb: {
                              type: 'string',
                              example:
                                'https://ftp.goit.study/img/so-yummy/preview/Shakshuka.jpg',
                            },
                            time: { type: 'string', example: '25' },
                            instructions: {
                              type: 'string',
                              example: 'Heat the oil in a frying pan...',
                            },
                            createdAt: {
                              type: 'string',
                              format: 'date-time',
                              example: '2023-03-11T19:25:33.247Z',
                            },
                            updatedAt: {
                              type: 'string',
                              format: 'date-time',
                              example: '2023-05-28T00:29:28.560Z',
                            },
                            ingredients: {
                              type: 'array',
                              items: {
                                type: 'object',
                                properties: {
                                  _id: {
                                    type: 'string',
                                    example: '640c2dd963a319ea671e372c',
                                  },
                                  name: {
                                    type: 'string',
                                    example: 'Olive Oil',
                                  },
                                  desc: {
                                    type: 'string',
                                    example:
                                      'A type of oil made from pressing whole olives...',
                                  },
                                  img: {
                                    type: 'string',
                                    example:
                                      'https://ftp.goit.study/img/so-yummy/ingredients/640c2dd963a319ea671e372c.png',
                                  },
                                  measure: { type: 'string', example: '1 tbs' },
                                },
                              },
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
            400: {
              description: 'Invalid category or validation failed',
            },
          },
        },
        post: {
          summary: 'Create a new recipe',
          tags: ['Recipes'],
          security: [{ cookieAuth: [] }],
          requestBody: {
            required: true,
            content: {
              'multipart/form-data': {
                schema: {
                  type: 'object',
                  properties: {
                    title: {
                      type: 'string',
                      maxLength: 64,
                      example: 'Shakshuka',
                    },
                    category: { type: 'string', example: 'Vegetarian' },
                    description: {
                      type: 'string',
                      maxLength: 200,
                      example: 'A popular Middle Eastern dish...',
                    },
                    time: {
                      type: 'integer',
                      minimum: 1,
                      maximum: 360,
                      example: 25,
                    },
                    calories: {
                      type: 'integer',
                      minimum: 1,
                      maximum: 10000,
                      example: 350,
                    },
                    ingredients: {
                      type: 'array',
                      minItems: 1,
                      items: {
                        type: 'object',
                        properties: {
                          id: {
                            type: 'string',
                            example: '640c2dd963a319ea671e372c',
                          },
                          measure: { type: 'string', example: '1 tbs' },
                        },
                      },
                    },
                    instructions: {
                      type: 'string',
                      maxLength: 1200,
                      example: 'Heat the oil in a frying pan...',
                    },
                    recipePhoto: { type: 'string', format: 'binary' },
                  },
                  required: [
                    'title',
                    'category',
                    'description',
                    'time',
                    'ingredients',
                    'instructions',
                  ],
                },
              },
            },
          },
          responses: {
            201: {
              description: 'Recipe created successfully',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      message: {
                        type: 'string',
                        example: 'Recipe created successfully',
                      },
                      recipe: {
                        type: 'object',
                        properties: {
                          _id: {
                            type: 'string',
                            example: '6462a8f74c3d0ddd288980d1',
                          },
                          title: { type: 'string', example: 'Shakshuka' },
                          category: { type: 'string', example: 'Vegetarian' },
                          description: {
                            type: 'string',
                            example: 'A popular Middle Eastern dish...',
                          },
                          time: { type: 'integer', example: 25 },
                          calories: { type: 'integer', example: 350 },
                          instructions: {
                            type: 'string',
                            example: 'Heat the oil in a frying pan...',
                          },
                          thumb: {
                            type: 'string',
                            example:
                              'https://ftp.goit.study/img/so-yummy/preview/Shakshuka.jpg',
                          },
                          owner: {
                            type: 'string',
                            example: '64c8d958249fae54bae90bb9',
                          },
                          ingredients: {
                            type: 'array',
                            items: {
                              type: 'object',
                              properties: {
                                id: {
                                  type: 'string',
                                  example: '640c2dd963a319ea671e372c',
                                },
                                measure: { type: 'string', example: '1 tbs' },
                              },
                            },
                          },
                          createdAt: {
                            type: 'string',
                            format: 'date-time',
                            example: '2025-11-14T19:12:37.388Z',
                          },
                          updatedAt: {
                            type: 'string',
                            format: 'date-time',
                            example: '2025-11-14T19:12:37.388Z',
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
            400: { description: 'Invalid category or ingredients' },
          },
        },
      },
      '/api/recipes/personal': {
        get: {
          summary: 'Get personal recipes of authenticated user',
          tags: ['Recipes'],
          security: [{ cookieAuth: [] }],
          responses: {
            200: {
              description: 'List of personal recipes',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      total: { type: 'integer', example: 5 },
                      recipes: {
                        type: 'array',
                        items: {
                          type: 'object',
                          properties: {
                            _id: {
                              type: 'string',
                              example: '6462a8f74c3d0ddd288980d1',
                            },
                            title: { type: 'string', example: 'Shakshuka' },
                            category: { type: 'string', example: 'Vegetarian' },
                            owner: {
                              type: 'string',
                              example: '64c8d958249fae54bae90bb9',
                            },
                            instructions: {
                              type: 'string',
                              example: 'Heat the oil in a frying pan...',
                            },
                            description: {
                              type: 'string',
                              example: 'A popular Middle Eastern dish...',
                            },
                            thumb: {
                              type: 'string',
                              example:
                                'https://ftp.goit.study/img/so-yummy/preview/Shakshuka.jpg',
                            },
                            time: { type: 'string', example: '25' },
                            calories: { type: 'integer', example: 350 },
                            ingredients: {
                              type: 'array',
                              items: {
                                type: 'object',
                                properties: {
                                  _id: {
                                    type: 'string',
                                    example: '640c2dd963a319ea671e372c',
                                  },
                                  name: {
                                    type: 'string',
                                    example: 'Olive Oil',
                                  },
                                  desc: {
                                    type: 'string',
                                    example:
                                      'A type of oil made from pressing whole olives...',
                                  },
                                  img: {
                                    type: 'string',
                                    example:
                                      'https://ftp.goit.study/img/so-yummy/ingredients/640c2dd963a319ea671e372c.png',
                                  },
                                  measure: { type: 'string', example: '1 tbs' },
                                },
                              },
                            },
                            createdAt: {
                              type: 'string',
                              format: 'date-time',
                              example: '2025-11-14T19:12:37.388Z',
                            },
                            updatedAt: {
                              type: 'string',
                              format: 'date-time',
                              example: '2025-11-14T19:12:37.388Z',
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      '/api/recipes/favorites': {
        get: {
          summary: 'Get favorite recipes of authenticated user',
          tags: ['Favorites'],
          security: [{ cookieAuth: [] }],
          responses: {
            200: {
              description: 'List of favorite recipes',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        _id: {
                          type: 'string',
                          example: '6462a8f74c3d0ddd288980d1',
                        },
                        title: { type: 'string', example: 'Shakshuka' },
                        category: { type: 'string', example: 'Vegetarian' },
                        owner: {
                          type: 'string',
                          example: '64c8d958249fae54bae90bb9',
                        },
                        instructions: {
                          type: 'string',
                          example: 'Heat the oil in a frying pan...',
                        },
                        description: {
                          type: 'string',
                          example: 'A popular Middle Eastern dish...',
                        },
                        thumb: {
                          type: 'string',
                          example:
                            'https://ftp.goit.study/img/so-yummy/preview/Shakshuka.jpg',
                        },
                        time: { type: 'string', example: '25' },
                        calories: { type: 'integer', example: 350 },
                        ingredients: {
                          type: 'array',
                          items: {
                            type: 'object',
                            properties: {
                              name: { type: 'string', example: 'Olive Oil' },
                              desc: {
                                type: 'string',
                                example:
                                  'A type of oil made from pressing whole olives...',
                              },
                              img: {
                                type: 'string',
                                example:
                                  'https://ftp.goit.study/img/so-yummy/ingredients/640c2dd963a319ea671e372c.png',
                              },
                              measure: { type: 'string', example: '1 tbs' },
                            },
                          },
                        },
                        createdAt: {
                          type: 'string',
                          format: 'date-time',
                          example: '2025-11-14T19:12:37.388Z',
                        },
                        updatedAt: {
                          type: 'string',
                          format: 'date-time',
                          example: '2025-11-14T19:12:37.388Z',
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      '/api/recipes/favorites/{recipeId}': {
        post: {
          summary: 'Add a recipe to favorites',
          tags: ['Favorites'],
          security: [{ cookieAuth: [] }],
          parameters: [
            {
              name: 'recipeId',
              in: 'path',
              required: true,
              schema: { type: 'string' },
              description: 'ID of the recipe to add to favorites',
            },
          ],
          responses: {
            200: {
              description: 'Recipe added to favorites',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      message: {
                        type: 'string',
                        example: 'Added to favorites',
                      },
                    },
                  },
                },
              },
            },
            400: { description: 'Invalid recipe id' },
            404: { description: 'Recipe not found' },
          },
        },
        delete: {
          summary: 'Remove a recipe from favorites',
          tags: ['Favorites'],
          security: [{ cookieAuth: [] }],
          parameters: [
            {
              name: 'recipeId',
              in: 'path',
              required: true,
              schema: { type: 'string', example: '6462a8f74c3d0ddd288980d1' },
              description: 'ID of the recipe to remove from favorites',
            },
          ],
          responses: {
            200: {
              description: 'Recipe removed from favorites',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      message: {
                        type: 'string',
                        example: 'Recipe removed from favorites',
                      },
                    },
                  },
                },
              },
            },
            400: { description: 'Invalid recipe id' },
            404: { description: 'Recipe not found' },
          },
        },
      },
      '/api/recipes/{recipeId}': {
        get: {
          summary: 'Get recipe by ID',
          tags: ['Recipes'],
          parameters: [
            {
              name: 'recipeId',
              in: 'path',
              required: true,
              schema: { type: 'string' },
              description: 'ID of the recipe to fetch',
            },
          ],
          responses: {
            200: {
              description: 'Recipe fetched successfully',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      _id: {
                        type: 'string',
                        example: '69177f251b83bd0f200ba370',
                      },
                      title: { type: 'string', example: 'testname' },
                      category: { type: 'string', example: 'Vegeterian' },
                      owner: {
                        type: 'string',
                        example: '69175146f93dec5e863b7020',
                      },
                      instructions: { type: 'string', example: 'grab a beer' },
                      description: { type: 'string', example: 'eazy to make' },
                      thumb: {
                        type: 'string',
                        example:
                          'http://res.cloudinary.com/dcfruowkp/image/upload/v1763147557/recipes/photos/uhyycxlqp2kjtovgrw8p.png',
                      },
                      time: { type: 'string', example: '25' },
                      createdAt: {
                        type: 'string',
                        format: 'date-time',
                        example: '2025-11-14T19:12:37.388Z',
                      },
                      updatedAt: {
                        type: 'string',
                        format: 'date-time',
                        example: '2025-11-14T19:12:37.388Z',
                      },
                      ingredients: {
                        type: 'array',
                        items: {
                          type: 'object',
                          properties: {
                            name: { type: 'string', example: 'Gruyère' },
                            desc: {
                              type: 'string',
                              example:
                                'Gruyère is a type of Swiss cheese that is known for its nutty, slightly sweet flavor and smooth, creamy texture. It is often used in cooking and pairs well with foods like potatoes, mushrooms, and bread.',
                            },
                            img: {
                              type: 'string',
                              example:
                                'https://ftp.goit.study/img/so-yummy/ingredients/640c2dd963a319ea671e36f9.png',
                            },
                            measure: { type: 'string', example: '2' },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
            400: { description: 'Invalid recipe id' },
            404: { description: 'Recipe not found' },
          },
        },
      },
      '/api/users/me': {
        get: {
          summary: 'Get current authenticated user',
          tags: ['Users'],
          security: [{ cookieAuth: [] }],
          responses: {
            200: {
              description: 'Current user information',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      _id: {
                        type: 'string',
                        example: '64c8d958249fae54bae90bb9',
                      },
                      email: { type: 'string', example: 'user@mail.com' },
                      name: { type: 'string', example: 'John' },
                      avatar: {
                        type: 'string',
                        example:
                          'https://ac.goit.global/fullstack/react/default-avatar.jpg',
                      },
                      createdAt: {
                        type: 'string',
                        format: 'date-time',
                        example: '2025-11-11T18:33:45.468Z',
                      },
                      updatedAt: {
                        type: 'string',
                        format: 'date-time',
                        example: '2025-11-11T18:33:45.468Z',
                      },
                    },
                  },
                },
              },
            },
            404: { description: 'User not found' },
          },
        },
      },
    },
  },
  apis: ['./routes/*.js'],
};

export const swaggerSpec = swaggerJsdoc(options);

export const swaggerDocs = (app) => {
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
