btn=document.getElementById("solve");
clb=document.getElementById("clear");


function isSafe(board, row, col,n)
{
    var num=board[row][col];
    // Row has the unique (row-clash)
    for (var d = 0; d <n; d++)
    {

        // Check if the number we are trying to
        // place is already present in
        // that row, return false;
        if (board[row][d] == num && d!=col) {
            return false;
        }
    }

    // Column has the unique numbers (column-clash)
    for (var r = 0; r < n; r++)
    {

        // Check if the number
        // we are trying to
        // place is already present in
        // that column, return false;
        if (board[r][col] == num && r!=row)
        {
            return false;
        }
    }

    // Corresponding square has
    // unique number (box-clash)
    var sqrt = 3;
    var boxRowStart = row - row % sqrt;
    var boxColStart = col - col % sqrt;

    for (var r = boxRowStart;r < boxRowStart + sqrt; r++)
    {
        for (var d = boxColStart;d < boxColStart + sqrt; d++)
        {
            if (board[r][d] == num && r!=row && d!=col)
            {
                return false;
            }
        }
    }

    // if there is no clash, it's safe
    return true;
}


function solver(board,n){

    var row=-1;
    var col=-1;

    var empty=false;

    for(var i=0;i<n;i++){
        for(var j=0;j<n;j++){
            if(board[i][j]==0){
               empty=true;
               row=i;
               col=j;

            }
        }
        if(empty){
            break;
        }

    }


    if(empty) {
        for (var i = 1; i <= 9; i++) {

            board[row][col]=i;

            if(isSafe(board,row,col,n)){

                if(solver(board,n)) {
                return true;
                }

            }
            board[row][col]=0;
        }
        return false;
    }
    else{
        return true;
    }



}


btn.onclick=()=>{
    var arr=new Array();
    var flag=false;

    for(var i=1;i<=9;i++){
        let row=new Array();  
    
        for(var j=1;j<=9;j++){
           var  pos=i.toString()+j.toString();
    
            var a=document.getElementById(`${pos}`);
    
            var v=parseInt(a.value);

           
            if(isNaN(v)){
                row.push(0);
            }
            else{

                //identifying if wrong values are inputted
                if(v<1 || v>9){
                    flag=true;
                }
                row.push(v);
                a.style.backgroundColor="grey";
            }
            
        }
        console.log(row);
        arr.push(row);

    }

    if(flag){
        alert("Wrong input!! Please enter number between 1 to 9");
    }
    else{

    var print=solver(arr,9);

    if(print){
        for(var i=1;i<=9;i++){

            for(var j=1;j<=9;j++){
            
               var pos=i.toString()+j.toString();
    
                var a=document.getElementById(`${pos}`);
            
                a.value=(arr[i-1][j-1]);
            
            }

        }
    }
    else{
        alert("No solution exists for your input");
    }
   


  }
}



clb.onclick=()=>{

    for(var i=1;i<=9;i++){

        for(var j=1;j<=9;j++){
        
           var pos=i.toString()+j.toString();

            var a=document.getElementById(`${pos}`);
        
            a.value="";
            a.style.backgroundColor="gold";
        
        }

    }

}

