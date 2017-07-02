/*Author: Zihan Zhao*/

function News(newsAgg){
  this.newsList = newsAgg.newsList;
}

function isString(str){
	return (typeof str=='string')&&str.constructor==String;
}
 
var url = "http://www.toutiao.com/api/article/recent/?source=2&category=news_hot&as=A1D5D87595C3287"
News.prototype.NewsHot = function (url, callback){
	//newsList(hot news)
	var newsList = new Array("","","","");
	request(
		{url: url, json: true}, 
		function (error, response, body)
		{
			if (!error && response.statusCode === 200) 
			{
				var j=0;	
				for(var i=0;i<body.data.length&&j<4;i++)
				{				
					console.log("i: "+i);
					console.log("j: "+j);
					if(body.data[i].has_image==true)
					{
						newsList[j] = body.data[i];
						if(isString(newsList[j].middle_image))
						{			
							var url_image = newsList[j].middle_image;
							url_image = url_image.replace("list", "large");
							newsList[j].middle_image = url_image;
							//console.log(newsList[j].middle_image);
						}
						else
						{
							var url_image = newsList[j].middle_image.url;
							url_image = url_image.replace("list", "large");
							newsList[j].middle_image = url_image;
							//console.log(newsList[j].middle_image);
						}
						j++;
					}
				}				
				//console.log(newsList[0]); // Print the json response
			}
		}
	);
    callback(error,newsList);
}

module.exports = News;
