var request;


$(document).ready(function(){
	
	$("#num1, #num2, #num3, #num4, #num5, #num6, #num7, #num8, #num9, #num0, #add, #sub, #div, #mul").click( function(){
		$("#inputDisplay").val($("#inputDisplay").val() + $(this).val());
	});
	
	$("#subBut").click(function() {
		$("#errorMessage").val("");
		var userInput = $("#inputDisplay").val();
		
		request = $.ajax({
			url: "calcEval",
			method: "POST",
			data: { input: userInput },
			dataType: "html"
		});
		
		request.done ( function( msg ){
			var data = JSON.parse(msg);
			console.log(data);
			$("#outputDisplay").val(data.value);
		});
		
		request.fail(function ( jqXHR, textStatus ) {
			$("#errorMessage").val("Failed to submit/recieve data. Error: " + textStatus);
		});
	});
	
});