d3.json("/api/weather.json").then(function(data){

    tempvprice(data)
    pressvprice(data)
    humvprice(data)
    cldvprice(data)
    map(data)
})