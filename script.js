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

function zigmaImI(a,b){
    let max = Math.max(a,b) ;
    let min = Math.min(a,b) ;

    if ( min == 0 )
        return zigmaI(1,max) ;
    else if ( max == 0 )
        return 0 ;
    else
        return ( max*(max+1)*(2*max+1) - min*(min-1)*(2*min-1) ) / 6 ;
}

function binaryOperator(a,b,o){
    switch ( o ) {
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
        case 'Σ' :
            return zigmaI(a,b) ;
            break ;
        case "Σii+*" :
            return 2*zigmaI(a,b) ;
            break ;
        case "Σii*" :
            return zigmaImI(a,b) ;
            break ;
    }
}
/*--------------------------------------------------------------*/
function computePostfix(postfix){
    let numberStack = [] ;

    for ( let i = 0 ; i < postfix.length ; i++ )
        if ( typeof(postfix[i]) == "number" )
            numberStack.push(postfix[i]) ;
        else {
            let temp = binaryOperator( numberStack[numberStack.length - 2] , numberStack[numberStack.length - 1] , postfix[i] )

            numberStack.pop() ;
            numberStack.pop() ;
            numberStack.push(temp) ;
        }

    return numberStack[0] ;
}

function genPrePostfix(remainLength,result,choices,currentCombs){
    if ( remainLength === 0 )
        result.push(currentCombs) ;
    else 
        for ( let i = 0 ; i < choices.length ; i++ )
        genPrePostfix(remainLength-1,result,choices, currentCombs.concat(choices[i])) ;
}

function genPostfix(remain,result,choices,current){
    if ( remain === 0 && typeof(current[0]) == "number" )
        result.push(current) ;
    else
        for ( let i = 0 ; i < choices.length ; i++ )
            for ( let j = 0 ; j < current.length ; j++ )
            {
                let temp = [].concat(current) ;
                let tempChoice = [].concat(choices) ;

                tempChoice.splice(i,1) ;
                temp.splice(j,0,choices[i]) ;
                genPostfix( remain - 1 ,result , tempChoice , temp ) ;
            }

    return ;
}

// let lemon = [] ;
// let hedwig = [] ;
// let operator1 = ['+','-','*','/','Σi',"Σii+","Σii*"] ;
// let numbers1 = [9,8,7,6,5] ;

// genPrePostfix(numbers1.length-1,hedwig,operator1,[]) ;

// console.log(hedwig) ;

// for ( let i = 0 ; i < hedwig.length ; i++ )
//     genPostfix(numbers1.length,lemon,numbers1,hedwig[i]) ;

// console.log(lemon) ;

/*---------------------------------------------------------------------------------------- */
function addTextToOutput(output){
    document.getElementById("output").appendChild(document.createElement("p").appendChild(document.createTextNode(output))) ;
    document.getElementById("output").appendChild(document.createElement("br")) ;
}
/* --------------------------------------------------------------------------------------- */
function start() {
    document.getElementById("output").innerHTML = '' ;

    let inputProblem = document.getElementById("problem").value ;
    let lemon = [] ;
    let numbers = [] ;
    let hedwig = [] ;

    for ( let i = 0 ; i < inputProblem.length ; i++ )
        numbers.push(parseInt(inputProblem[i])) ;

    let operator = ['+','-','*','/','Σi',"Σii+","Σii*"] ;
    genPrePostfix(numbers.length-1,hedwig,operator,[]) ;

    console.log(hedwig) ;
    /* ----------------------------------------------------------------------------------- */

    for ( let i = 0 ; i < hedwig.length ; i++ )
        genPostfix(numbers.length,lemon,numbers,hedwig[i]) ;

    console.log(lemon) ;

    for ( let i = 0 ; i < lemon.length ; i++ )
        if ( computePostfix(lemon[i]) == parseInt(document.getElementById("answer").value) )
            addTextToOutput(lemon[i]) ;
    
}