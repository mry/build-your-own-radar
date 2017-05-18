/**
 * Created by tan on 21.01.17.
 */
const InputSanitizer = require('./inputSanitizer');
const GraphingRadar = require('../graphing/radar');
const Radar = require('../models/radar');
const Quadrant = require('../models/quadrant');
const Ring = require('../models/ring');
const Blip = require('../models/blip');
const _ = {
    map: require('lodash/map'),
    uniqBy: require('lodash/uniqBy'),
    capitalize: require('lodash/capitalize'),
    each: require('lodash/each')
};

const JsonRadar = function () {

    var self = {};

    self.build = function(blipsJsonArr) {
        var size = (window.innerHeight - 133) < 620 ? 620 : window.innerHeight - 133;

        var blips = _.map(blipsJsonArr, new InputSanitizer().sanitize);

        var rings = _.map(_.uniqBy(blips, 'ring'), 'ring');
        var ringMap = {};
        var maxRings = 4;

        _.each(rings, function (ringName, i) {
            if (i == maxRings) {
                throw new MalformedDataError(ExceptionMessages.TOO_MANY_RINGS);
            }
            ringMap[ringName] = new Ring(ringName, i);
        });

        var quadrants = {};
        _.each(blips, function (blip) {
            if (!quadrants[blip.quadrant]) {
                quadrants[blip.quadrant] = new Quadrant(_.capitalize(blip.quadrant));
            }
            quadrants[blip.quadrant].add(new Blip(blip.name, ringMap[blip.ring], blip.isNew.toLowerCase() === 'true', blip.topic, blip.description))
        });

        var radar = new Radar();
        _.each(quadrants, function (quadrant) {
            radar.addQuadrant(quadrant)
        });

        new GraphingRadar(size, radar).init().plot();

    }

    return self;
};

module.exports = JsonRadar;