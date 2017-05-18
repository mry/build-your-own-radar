require('./stylesheets/base.scss');
require('./images/logo.png');
require('./images/tech-radar-201611-landing-page-wide.png');
require('./images/tw-logo.png');
require('./images/favicon.ico');
require('./images/radar_legend.png');

// Added local storage and commented out Google Sheet as below

//const GoogleSheetInput = require('./util/factory');

//GoogleSheetInput().build();

const JsonRadar = require('./util/jsonFactory');
JsonRadar().build(require('./offline/template.json'));