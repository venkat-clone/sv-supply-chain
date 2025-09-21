
// Automatically generated route exports
var express = require('express');
const indexRouter = express.Router();
const { validateRequest,prismaErrorHandler } = require('../utils/utils');

const UserRoutes = require('./UserRoutes');
const RoleRoutes = require('./RoleRoutes');
const PermissionRoutes = require('./PermissionRoutes');
const RolePermissionRoutes = require('./RolePermissionRoutes');
const OrderRoutes = require('./OrderRoutes');
const LocationRoutes = require('./LocationRoutes');
const ExtraChargeRoutes = require('./ExtraChargeRoutes');
const VehicleRoutes = require('./VehicleRoutes');
const VehicleTypeRoutes = require('./VehicleTypeRoutes');

indexRouter.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

indexRouter.use('/user', UserRoutes);
indexRouter.use('/role', RoleRoutes);
indexRouter.use('/permission', PermissionRoutes);
indexRouter.use('/rolepermission', RolePermissionRoutes);
indexRouter.use('/order', OrderRoutes);
indexRouter.use('/location', LocationRoutes);
indexRouter.use('/extracharge', ExtraChargeRoutes);
indexRouter.use('/vehicle', VehicleRoutes);
indexRouter.use('/vehicletype', VehicleTypeRoutes);


indexRouter.use(prismaErrorHandler);

module.exports = {
    UserRoutes,
    RoleRoutes,
    PermissionRoutes,
    RolePermissionRoutes,
    OrderRoutes,
    LocationRoutes,
    ExtraChargeRoutes,
    VehicleRoutes,
    VehicleTypeRoutes,
    indexRouter
};
