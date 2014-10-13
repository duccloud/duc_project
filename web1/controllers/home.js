var models = require('../app/models'),
	md5 = require('MD5'),
	_ = require('underscore');

module.exports = {
	index: function(req, res) {
    	models.site_item.find({}, function(err, sites){
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

    		if(tmpGroup.length != 0){
    			groupRender.push(tmpGroup)
    		}    		

			res.render('index', {sites: groupRender});
    	});
    }
};
