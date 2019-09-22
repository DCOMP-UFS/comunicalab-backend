"use strict";

/*
|--------------------------------------------------------------------------
| Factory
|--------------------------------------------------------------------------
|
| Factories are used to define blueprints for database tables or Lucid
| models. Later you can use these blueprints to seed your database
| with dummy data.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use("Factory");

Factory.blueprint("App/Models/Software", faker => {
  return {
    name: faker.name(),
    version: faker.string(),
    license: faker.string(),
    isDelete: faker.bool({ likelihood: 0 })
    // specification_id: faker.natural({ min: 0, max: 2000 }),
  };
});
