
var canvas  = document.querySelector("canvas");
var ctx = canvas.getContext("2d");


var height = ctx.canvas.height
var width  = ctx.canvas.width


async function swap(arr, a, b){

   await sleep(0);

    var temp = arr[a];
    arr[a] = arr[b];
    arr[b] = temp;
};

var ix = 0;

function bubbleSort(){   
    if(ix < values.length){       
        for (var n = 0; n < values.length; n++) {
            var a = values[n];
            var b = values[n+1];           
        
            if(a > b){                
                drawLine( n , height , n , height - values[n] , 'pink' );
                swap(values,n,n+1);                
            };       
        }    
    } 
    ix++;
};

async function quickSort(arr,start,end){
    if(start >= end){
        return;
    };

    var  index  = await partition(arr,start,end);
    states[index] = -1;

    await Promise.all([
        await quickSort(arr , start , index - 1),
        await quickSort(arr , index + 1 , end)
    ]);
  
};


async function partition(arr,start,end){

    let pivotIndex = start;
    let pivotValue = arr[end];

    states[pivotIndex] = 0;

    for (let i = start; i < end ; i++) {
        if(arr[i] < pivotValue){
            await swap(arr,i,pivotIndex);
            states[pivotIndex] = -1;
            pivotIndex ++;
            states[pivotIndex] = 0;
        }        
    }   
    await swap(arr,pivotIndex,end);

    return pivotIndex;
};


async function SelectionSort(){
    var i, j, min_idx;
 
    for (i = 0; i < values.length-1; i++){
        min_idx = i;
        for (j = i + 1; j < values.length; j++)
        if (values[j] < values[min_idx])
            min_idx = j;


        await swap(values,min_idx, i);
    }
};

function drawLine(x,y,xx,yy,color){
    ctx.lineWidth = 1;
    ctx.strokeStyle = color;

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(xx,yy);
    ctx.stroke();  
};


var values ;

function setRandomValues(){   
    for ( i = 0; i < values.length; i++) {
        values[i] = Math.random() * height; 
    };      
}

function setup(){
    values = new Array(width);  
    states = new Array(width);

    setRandomValues();
};

function sleep(ms){
    return new Promise(resolve => setTimeout(resolve , ms));
};

var sort;

function setSortSelection(){
    sort = 's';
    setRandomValues();
};


function setSortBubble(){
    sort = 'b';
    setRandomValues();
};

function setSortQuick(){
    sort = 'q';
    setRandomValues();
};

function draw(){

    ctx.fillStyle = 'rgb(0,0,0)';
    ctx.fillRect(0,0,canvas.width,canvas.height);

    if(sort === 'b'){
         bubbleSort();
    }
    else if(sort === 'q'){
        quickSort(values , 0, values.length - 1); 
    } 
    else if(sort === 's'){
        SelectionSort();
    } 
    for (var k = 0; k < values.length; k++) {
        var color = 'white';
        drawLine( k , height , k , height - values[k] , color );                
    };   


    requestAnimationFrame(draw);
};


setup();
draw();

