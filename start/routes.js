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
const Route = use('Route');

Route.get('/', () => {
  return { greeting: 'Hello world in JSON' };
});

Route.resource('software', 'SoftwareController')
  .apiOnly()
  .validator(
    new Map([
      [['software.store'], ['Software']],
      [['software.update'], ['Software']],
    ])
  );

Route.resource('laboratory', 'LaboratoryController')
  .apiOnly()
  .validator(
    new Map([
      [['laboratory.store'], ['Laboratory']],
      [['laboratory.update'], ['Laboratory']],
    ])
  );

Route.resource('ticket', 'TicketController')
  .apiOnly()
  .validator(
    new Map([
      [['ticket.store'], ['StoreTicket']],
      [['ticket.update'], ['UpdateTicket']],
    ])
  );

Route.resource('progress', 'ProgressController')
  .apiOnly()
  .validator(
    new Map([
      [['progress.store'], ['StoreProgress']],
      [['progress.update'], ['UpdateProgress']],
    ])
  );

Route.resource('equipment', 'EquipmentController')
  .apiOnly()
  .validator(
    new Map([
      [['equipment.store'], ['Equipment']],
      [['equipment.update'], ['Equipment']],
    ])
  );

Route.resource('installation', 'InstallationController')
  .apiOnly()
  .validator(
    new Map([
      [['installation.store'], ['Installation']],
      [['installation.update'], ['Installation']],
    ])
  );
Route.resource('soft_category', 'SoftCategoryController')
  .apiOnly()
  .validator(
    new Map([
      [['soft_category.store'], ['SoftCategory']],
      [['soft_category.update'], ['SoftCategory']],
    ])
  );
Route.resource('equip_category', 'EquipCategoryController')
  .apiOnly()
  .validator(
    new Map([
      [['equip_category.store'], ['EquipCategory']],
      [['equip_category.update'], ['EquipCategory']],
    ])
  );

Route.resource('spec_item', 'SpecItemController')
  .apiOnly()
  .validator(
    new Map([
      [['spec_item.store'], ['SpecItem']],
      [['spec_item.update'], ['SpecItem']],
    ])
  );

Route.resource('specification', 'SpecificationController')
  .apiOnly()
  .validator(
    new Map([
      [['specification.store'], ['Specification']],
      [['specification.update'], ['Specification']],
    ])
  );
