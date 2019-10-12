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

Route.get("/laboratory", "LaboratoryController.index");
Route.post("/laboratory", "LaboratoryController.store");
Route.put("/laboratory/:id", "LaboratoryController.update")
Route.delete("/laboratory/:id", "LaboratoryController.destroy")
Route.get("/laboratory/:id", "LaboratoryController.show")

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

Route.get("/specification_item", "SpecificationItemController.index");
Route.post("/specification_item", "SpecificationItemController.store");
Route.put("/specification_item/:id", "SpecificationItemController.update");
Route.delete("/specification_item/:id", "SpecificationItemController.destroy");
Route.get("/specification_item/:id", "SpecificationItemController.show");

