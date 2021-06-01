d3.json("/api/weather.json").then(function(data){
    
    tempvprice(data)
    pressvprice(data)
    humvprice(data)
    cldvprice(data)
    map(data)
})

// document.querySelector("#selectoption").addEventListener
let last_shown = "map"
$("#selectoption").change(function(){
    $(`#${last_shown}`).css("display", "none")
    last_shown = this.value 
    let selected_chart = this.value
    $(`#${selected_chart}`).css("display", "")
})