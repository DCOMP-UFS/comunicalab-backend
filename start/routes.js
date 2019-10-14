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


Route.resource("software", "SoftwareController")
  .apiOnly()
  .validator(
    new Map([
      [["software.store"], ["Software"]],
      [["software.update"], ["Software"]]
    ])
  );

Route.get("/laboratory", "LaboratoryController.index");
Route.post("/laboratory", "LaboratoryController.store");
Route.put("/laboratory/:id", "LaboratoryController.update");
Route.delete("/laboratory/:id", "LaboratoryController.destroy");
Route.get("/laboratory/:id", "LaboratoryController.show");


Route.get("/called", "CalledController.index");
Route.post("/called", "CalledController.store");
Route.put("/called/:id", "CalledController.update");
Route.delete("/called/:id", "CalledController.destroy");
Route.get("/called/:id", "CalledController.show");

Route.resource("/equipment", "EquipmentController").apiOnly();
Route.resource("/installed", "InstalledController").apiOnly();
Route.resource("softCategory", "SoftCategoryController")
  .apiOnly()
  .validator(
    new Map([
      [["softCategory.store"], ["SoftCategory"]],
      [["softCategory.update"], ["SoftCategory"]]
    ])
  );
Route.resource("equipCategory", "equipCategoryController").apiOnly()

