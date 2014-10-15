var models = require('../app/models'),
	md5 = require('MD5'),
	_ = require('underscore'),
    paginate  = require('mongoose-range-paginate');

var limitSizeSite = 24;

var returnRenderSitesData = function(sites){
    var groupIndex = 0;
    var itemInGroup = 0;
    var groupRender = [];
    var tmpGroup = [];

    _.each(sites, function(s){
        if(itemInGroup == 6){
            itemInGroup = 0;
            groupRender.push(tmpGroup);
            tmpGroup = [];
        }

        tmpGroup.push(s);

        itemInGroup++;
    });

    if(tmpGroup.length != 0){groupRender.push(tmpGroup)}           

    return groupRender;
}

var getData = function(startId, callback){
    var q = models.site_item.find({});

    paginate(q, {
        startId: startId,
        limit: limitSizeSite
    }).exec(function(err, sites){
        renderData = returnRenderSitesData(sites)
        callback(renderData);
    });
}

module.exports = {
	index: function(req, res) {
        var q = models.site_item.find({}).limit(limitSizeSite);
    	q.exec(function(err, sites){ 
            renderData = returnRenderSitesData(sites);
			res.render('index', {sites: renderData});
    	});
    },

    get_side_range: function(req, res){
        var nextId  = req.query.nextId;
        getData(nextId, function(renderData){
            res.json({sites: renderData});
        });
    }
};