function time(){
    setTimeout(function (){alert("Hola mundo")}, time()*1000);

}

for (let i = 0; i>-1; i++){
    time()
}       