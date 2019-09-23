"use strict";

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use("Route");

Route.get("/", () => {
  return { greeting: "Hello world in JSON" };
});

Route.post("/software", "SoftwareController.store");
Route.get("/software", "SoftwareController.index");
Route.get("/software/:id", "SoftwareController.show");
Route.put("/software/:id", "SoftwareController.update");
Route.delete("/software/:id", "SoftwareController.destroy");
