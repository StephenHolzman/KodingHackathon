
current_party = "democrats";



var RepDebates = ["20150806","20150916","20151028","20151110","20151215"]
var DemDebates = ["20151013","20151114","20151219"]
var parseDate = d3.time.format("%Y%m%d").parse;

//Draw the main chart
var draw_timeseries_linechart = function(target,id){
    var DemButton = d3.select("#democrats").on("click",function(){
        if(current_party === "republicans"){
            current_party = "democrats";
            d3.selectAll(".rDebates").remove();
            draw_debate_lines();
        }   
    });

    var RepButton = d3.select("#republicans").on("click",function(){
        if(current_party === "democrats"){
            current_party = "republicans";
            d3.selectAll(".dDebates").remove();
            draw_debate_lines();
        }   
    });
    //Set Margins for Chart
    var margin = {top: 10,right: 20,bottom: 100, left: 60},
        //marginBrush = {top:420, right: 150, bottom: 20, left:150}
        width = window.innerWidth*.9 - margin.right - margin.left,
        height = 450 - margin.top - margin.bottom,
        //heightBrush = 500 - marginBrush.top - marginBrush.bottom;
        
    chart = d3.select(target)
                            .append("svg")
                            .attr("id",id)
                            .attr("width", width + margin.left + margin.right)
                            .attr("height", height + margin.top + margin.bottom)
                            .append("g")
                            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
                            
    var xScale = d3.time.scale()
                    .range([0, width])
                    .domain([parseDate('20150601'),parseDate('20160218')]);

    /*var xScaleBrush = d3.time.scale()
                        .range([0, width])
                        .domain([parseDate('20150601'),parseDate('20150218')]);
     */        
    var yScale = d3.scale.linear()
                    .range([height, 0])
                    .domain([0,100]);
    
    /*var yScaleBrush = d3.scale.linear()
                    .range([heightBrush, 0])
                    .domain([0,100]);
    */

    var xAxis = d3.svg.axis()
                    .scale(xScale)
                    .orient("bottom");

    /*var xAxisBrush = d3.svg.axis()
                    .scale(xScaleBrush)
                    .orient("bottom");
    */

    var yAxis = d3.svg.axis()
                    .scale(yScale)
                    .orient("left")
                    .ticks(5);
    
    var timeAxis = chart.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);

    var moneyAxis = chart.append("g")
            .attr("class", "y axis")
            .call(yAxis);

    var draw_debate_lines = function(){
        d3.selectAll(".rDebates").remove();
        d3.selectAll(".dDebates").remove();
        if(current_party==="republicans"){
            var rDebates = chart.append("g")
                        .attr("class","rDebates");
        
            RepDebates.forEach(function(d,i) {

                d = parseDate(d);
                var line = rDebates.append("line")
                    .attr("id", "rDebate"+RepDebates[i])
                    .attr("x1", xScale(d))
                    .attr("x2", xScale(d))
                    .attr("y1", yScale(0))
                    .attr("y2", yScale(100));
            });
        }else if(current_party==="democrats"){
           var dDebates = chart.append("g")
                        .attr("class","dDebates");

            DemDebates.forEach(function(d,i) {
                d = parseDate(d);
                var line = dDebates.append("line")
                    .attr("id", "dDebate"+DemDebates[i])
                    .attr("x1", xScale(d))
                    .attr("x2", xScale(d))
                    .attr("y1", yScale(0))
                    .attr("y2", yScale(100));
            }); 
        };
              
    };
    draw_debate_lines();

    var resize = function(){
        if(window.innerWidth>800){
        if(storymode===false){
            width = window.innerWidth*.9 - margin.right - margin.left; 
       }else{
            width = window.innerWidth*.6 - margin.right - margin.left;

       };
        d3.select("#chart-wrapper").transition()
            .attr("width", width + margin.left + margin.right)
            .duration(1);
        

        xScale.range([0, width]);
        yScale.range([height, 0]);

        timeAxis.transition()
            .duration(1)
            .call(xAxis);

        d3.select(".rDebates").remove();
        d3.select(".dDebates").remove();
        draw_debate_lines();
    };
    };

    d3.select(window).on('resize',resize);

    var storymode = false;
    var months = ["05","06","07","08","09","10","11","12","01","02"];
    var monthnames = ["May","June","July","August","September","October","November","December","January","February"]
        
    var month_wrapper = d3.select("#main-wrapper").append("div")
                                        .attr("id","month-wrapper");

    var monthList = month_wrapper.append("center").append("ul");

    monthnames.forEach(function(d,i){

        monthnav = monthList.append("li")
                    .append("a")
                    .attr("id","nav"+d)
                    .attr("class","button")
                    .text(d);

        monthnav.on("click",function(){
            storymode = true;
            width = window.innerWidth*.6 - margin.right - margin.left;
            d3.select("#chart-wrapper").transition()
            .attr("width", width + margin.left + margin.right)
            .duration(1200);
            d3.select("#poll-wrapper").transition()
            .attr("class", "halfscreen")
            .duration(1200);

            if(d==="January"|d==="March"|d==="May"|d==="July"|d==="August"|d==="October"|d==="December"){
                lastday = "31"
            }else if(d==="February"){
                lastday = "29"
            }else{
                lastday = "30"
            };
            if(i > 7){
                year = "2016"
            }else{
                year = "2015"
            }
            xScale.range([0, width])
                    .domain([parseDate(year+months[i]+'01'),parseDate(year+months[i]+lastday)]);
            
            yScale.range([height, 0]);
            
            xAxis = d3.svg.axis()
                    .scale(xScale)
                    .orient("bottom")
                    .ticks(4);
                    //.tickFormat(d3.time.format('%d'));

            timeAxis.transition()
                .duration(1200)
                .call(xAxis);
            
            //draw_debate_lines();
            RepDebates.forEach(function(d,i){
                d = parseDate(d);
                d3.select("#rDebate"+RepDebates[i]).transition()
                    .duration(1200)
                    .attr("id", "rDebate"+RepDebates[i])
                    .attr("x1", xScale(d))
                    .attr("x2", xScale(d))
                    .attr("y1", yScale(0))
                    .attr("y2", yScale(100));

                var debateLabel = d3.select("#rDebate").append("text")
                    .attr("class", "Label")
                    .attr("transform", "translate("+xScale(d)+","+yScale(.07)+")rotate(-90)")
                    .text("Republican Debate");

            });

            DemDebates.forEach(function(d,i){
                d = parseDate(d);
                d3.select("#dDebate"+DemDebates[i]).transition()
                    .duration(1200)
                    .attr("id", "dDebate"+DemDebates[i])
                    .attr("x1", xScale(d))
                    .attr("x2", xScale(d))
                    .attr("y1", yScale(0))
                    .attr("y2", yScale(100));
                console.log(xScale(d));
                d3.select("#dDebate").append("text")
                    .attr("class", "Label")
                    .attr("transform", "translate("+xScale(d)+","+yScale(20)+")rotate(-90)")
                    .text("Democratic Debate");

            });

            setTimeout(function(){d3.select("#tweet-wrapper").attr("class","").attr("opacity",0).transition().attr("opacity",1).duration(500)},[1300]);

        })
    })

};


draw_timeseries_linechart("#poll-wrapper","chart-wrapper");
  