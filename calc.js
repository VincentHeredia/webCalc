
var evaluate = function(inputString){
	var postFixStack = new Array();
	var inputStack = new Array();
	
	try{
		inputStack = tokenizeString(inputString);
	
		postFixStack = convertToPostFix(inputStack);
		var outputNum = evalPostfix(postFixStack);
		
		return [outputNum, ""];
	}
	catch(error){
		console.log(error);
		return [error, inputString];
	}
}
module.exports.evaluate = evaluate;


//Purpose: Tokenizes the input string
function tokenizeString(inputString){
	var returnElement = new Array();
	var index = 0;
	var flag = 0;
	
	returnElement.push("");
	for(i = 0; inputString.length > i; i++){
		if(isNaN(inputString[i])){
			if(flag === 1){
				throw "Error: Syntax";
			}
			index++;
			returnElement.push("");
			returnElement[index] = inputString[i];
			index++;
			returnElement.push("");
			flag = 1;
		}
		else {
			returnElement[index] = returnElement[index] + inputString[i];
			flag = 0;
		}
	}
	if(returnElement[returnElement.length-1] === ""){
		returnElement.pop();
	}
	return returnElement;
}

//Purpose: Converts infix to postfix
//Info: Algorithm is from http://scriptasylum.com/tutorials/infix_postfix/algorithms/infix-postfix/
function convertToPostFix(inputStack){
	var operatorStack = new Array();
	var outputStack = new Array();
	
	for(i = 0; i < inputStack.length; i++){
		//is operator
		if(isNaN(inputStack[i])){
			if(operatorStack.length === 0){
				operatorStack.push(inputStack[i]);
			}
			else{//compare precedence
				//add element class and put presedences in there, would make this if statement a 1 liner
				//while (Priority of top <= Priority of new element)
				if (((operatorStack[operatorStack.length-1] == '*' || operatorStack[operatorStack.length-1] == '/' || operatorStack[operatorStack.length-1] == '+' || operatorStack[operatorStack.length-1] == '-')&&(inputStack[i] == '+' || inputStack[i] == '-'))||((operatorStack[operatorStack.length-1] == '*' || operatorStack[operatorStack.length-1] == '/')&&(inputStack[i] == '*' || inputStack[i] == '/')))
				{
					while(((operatorStack[operatorStack.length-1] == '*' || operatorStack[operatorStack.length-1] == '/' || operatorStack[operatorStack.length-1] == '+' || operatorStack[operatorStack.length-1] == '-')&&(inputStack[i] == '+' || inputStack[i] == '-'))||((operatorStack[operatorStack.length-1] == '*' || operatorStack[operatorStack.length-1] == '/')&&(inputStack[i] == '*' || inputStack[i] == '/')))
					{
						outputStack.push(operatorStack.pop());
					}
					operatorStack.push(inputStack[i]);
				}
				else{
					operatorStack.push(inputStack[i]);
				}
			}
		}
		else{//is operand
			outputStack.push(inputStack[i]);
		}
	}
	while(operatorStack.length > 0){
		outputStack.push(operatorStack.pop());
	}
	
	return outputStack;
}

//Purpose: Evaluates a postfix equation
//Info: Algorithm is from https://en.wikipedia.org/wiki/Reverse_Polish_notation
function evalPostfix(inputStack){
	var stack = new Array();
	var currentElement;
	
	//While there are input tokens left
	for(i = 0; inputStack.length > i; i++){
		//Read the next token from input.
		currentElement = inputStack[i];
		//If the token is a value
		if(!isNaN(currentElement)){
			//Push it onto the stack.
			stack.push(currentElement);
		}
		//Otherwise, the token is an operator (operator here includes both operators and functions).
		else{
			//It is known a priori that the operator takes n arguments.
			var priori = 2;//temp line
			//If there are fewer than n values on the stack
			if(stack.length < priori){
				//(Error) The user has not input sufficient values in the expression.
				throw "Error: Not enough values for operator";
			}
			else{
				//Else, Pop the top n values from the stack.
				var num2 = parseFloat(stack.pop());
				var num1 = parseFloat(stack.pop());

				if(num2 == 0 && currentElement == '/'){
					throw "Division by 0";
				}

				//Evaluate the operator, with the values as arguments.
				//Push the returned results, if any, back onto the stack.
				stack.push(evalCurrent(currentElement, num1, num2));
			}
		}
	}//end of while loop
	//If there is only one value in the stack
	if(stack.length == 1){
		//That value is the result of the calculation.
		return stack.pop();
	}
	//Otherwise, there are more values in the stack
	else{
		//(Error) The user input has too many values.
		throw "Error: Syntax";
		return 0;
	}
}


//Purpose: Evaluates a statement with only two operators
function evalCurrent(op, num1, num2){
	switch (op){
		case '+':
			return num1 + num2;
		case '-':
			return num1 - num2;
		case '*':
			return num1 * num2;
		case '/':
			return num1 / num2;
		default:
			throw "Error: Unknown operator";
	}//end of switch
}