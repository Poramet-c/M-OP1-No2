let postFix = [] ;
let numbers = [5,5,5,1] ;

let operators = ['+','-','*','/','^',"zi","zi+i","zi*i","zi/i"] ;
let numberStack = [] ;

/*--------------------------------------------------------------*/
function factorial(n){
    if ( n <= 1 )
        return 1 ;
    else
        return n * factorial(n-1) ;
}

function zigmaI(a,b){
    let max = Math.max(a,b) ;
    let min = Math.min(a,b) ;

    if ( min == 0 )
        return zigmaI(1,max) ;
    else if ( max == 0 )
        return 0 ;
    else
        return ( max*(max+1) - min*(min-1) ) / 2 ;
}

function zigmaII(a,b){
    let max = Math.max(a,b) ;
    let min = Math.min(a,b) ;

    if ( min == 0 )
        return zigmaI(1,max) ;
    else if ( max == 0 )
        return 0 ;
    else
        return ( max*(max+1)*(2*max+1) - min*(min-1)*(2*min-1) ) / 6 ;
}
/*--------------------------------------------------------------*/
function opera(a,b,o)
{
    switch (o) 
    {
        case '+' :
            return a + b ;
            break ;
        case '-' :
            return a - b ;
            break ;
        case '*' :
            return a * b ;
            break ;
        case '/' :
            return a / b ;
            break ;
        case '^' :
            return Math.pow(a,b) ;
            break ;
        case "zi" :
            return zigmaI(a,b);
            break ;
        case "zi+i" :
            return 2*zigmaI(a,b);
            break ;
        case "zi*i" :
            return zigmaII(a,b);
            break ;
        case "zi/i" :
            return Math.abs(a-b) + 1 ;
    }
}

function unaryOpera(a,o)
{
    switch ( o ) 
    {
        case '!' :
            return factorial(a) ;
            break ;
        case 's' :
            return Math.sqrt(a) ;
            break ;
    }
}
/*--------------------------------------------------------------*/
function calcOscar(){
    document.getElementById("outCount").innerHTML = "Calculating . . . ";
    let countLoops = 0 , countSolved = 0 , startTheClock = Date.now() ;

    document.getElementById("out").innerHTML = "" ;
    postFix = [] ;

    let temp = document.getElementById("problem").value;
    let result = parseInt(document.getElementById("result").value);
    
    if ( isNaN(result) )
        result = 24 ;

    for ( let i = 0 ; i < 4 ; i++ )
    {
        numbers[i] = parseInt(temp[i]) ;
    }

    console.log(numbers) ;
    console.log(postFix) ;
    console.log(numberStack) ;

    for ( let i = 0 ; i < operators.length ; i++ )
    for ( let j = 0 ; j < operators.length ; j++ )
    for ( let k = 0 ; k < operators.length ; k++ )
    {
        let temp = [ operators[i],operators[j],operators[k] ] ;
        let temp0 = [] ;

        for ( let i0 = 0 ; i0 < 4 ; i0++ )
            for ( let i1 = 0 ; i1 < 5 ; i1++ )
                for ( let i2 = 0 ; i2 < 6 ; i2++ )
                    for ( let i3 = 0 ; i3 < 7 ; i3++ )
                    {
                        postFix = [] ;
                        temp0 = [].concat(temp);

                        temp0.splice(i0,0,numbers[0]) ;
                        temp0.splice(i1,0,numbers[1]) ;
                        temp0.splice(i2,0,numbers[2]) ;
                        temp0.splice(i3,0,numbers[3]) ;

                        postFix = temp0 ;
                        let postFixTemp = temp0.toString() ;

                        for ( let token = 0 ; token < postFix.length ; token++ ) {
                            if ( postFix[token] == '!' || postFix[token] == 's')
                            {
                                let temp = unaryOpera(numberStack[numberStack.length - 1 ] , postFix[token] ) ;
                        
                                numberStack.pop() ;
                                numberStack.push(temp) ;
                            }
                            else if ( typeof(postFix[token]) == "string" )
                            {
                                let temp = opera(numberStack[numberStack.length - 2 ],numberStack[numberStack.length - 1 ] , postFix[token] ) ;
                        
                                numberStack.pop() ;
                                numberStack.pop() ;
                                numberStack.push(temp) ;
                            } else 
                                numberStack.push(postFix[token]) ;

                            countLoops++ ;
                        }

                        if ( !isNaN(numberStack[0]) && numberStack[0] == result )
                        {
                            countSolved++ ;
                            document.getElementById("out").innerHTML = document.getElementById("out").innerHTML + "<br>" + postFixTemp ;
                        }
                        numberStack = [] ;
                    }       
    }

    document.getElementById("outCount").innerHTML = "Tried " + countLoops + " ways in " + (Date.now() - startTheClock) + " milliseconds. <br>Only " + countSolved + " ways are the answers of " + document.getElementById("problem").value + " => " + parseInt(document.getElementById("result").value) +"." ;
}


/*--------------------------------------------------------------*/

//console.log(numberStack) ;

