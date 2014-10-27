var models = require('../app/models'),
	md5 = require('MD5'),
	_ = require('underscore'),
    moment = require('moment'),
    paginate  = require('mongoose-range-paginate');

var limitSizeSite = 24;
var limitItemInGroup = 6;

var returnRenderSitesData = function(sites){
    var groupIndex = 0;
    var itemInGroup = 0;
    var groupRender = [];
    var tmpGroup = [];

    _.each(sites, function(s){
        if(itemInGroup == limitItemInGroup){
            itemInGroup = 0;
            groupRender.push(tmpGroup);
            tmpGroup = [];
        }

        var newItem = {}
        newItem.cover = s.cover;
        newItem.href = s.href;
        newItem.name = s.name;
        newItem.source = s.source;

        var dObj = new Date(s.createdAt);
        newItem.createdAt = moment(new Date(s.createdAt)).fromNow();

        tmpGroup.push(newItem);

        itemInGroup++;
    });

    if(tmpGroup.length != 0){groupRender.push(tmpGroup)}           

    return groupRender;
}

module.exports = {
	index: function(req, res) {
        var startPageIndex = 1;

        models.SiteItem.paginate({}, startPageIndex, limitSizeSite, function(error, pageCount, paginatedResults, itemCount) {
            renderData = returnRenderSitesData(paginatedResults);
            res.render('index', {sites: renderData, item_count: itemCount, current_page: startPageIndex});
        }, {sortBy : {createdAt: -1}});
    },

    get_side_range: function(req, res){
        var nextPageIndex  = req.query.next_page;

        models.SiteItem.paginate({}, nextPageIndex, limitSizeSite, function(error, pageCount, paginatedResults, itemCount) {            
            renderData = returnRenderSitesData(paginatedResults);
            res.json({sites: renderData, item_count: itemCount, current_page: nextPageIndex + 1});
        }, {sortBy : {createdAt: -1}});        
    }
};