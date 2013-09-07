
window.onload = function() {

	var submitButton	= document.getElementById( "lagoonie-process" );
	var resetButton		= document.getElementById( "lagoonie-reset" );
	
	window.resetList	= function() {
	
		var textarea	= document.getElementById( "lagoonie-textarea" );
		
		textarea.value = "";
	
	}

	window.processList	= function() {
	
		var textarea	= document.getElementById( "lagoonie-textarea" ),
			listContent	= textarea.value,
			lines		= listContent.split(/\n/),
			result		= "",
			resultHTML	= document.getElementById( "lagoonie-result" );
		
		result = "<p>REPORT FOR: "+ lines[0] +"<br />"+ (lines.length-1) +" species observed.</p>"+
					"<table><tr><th>Species Name</th><th>Number Seen</th><th>Female</th><th>Male</th><th>Imm.</th><th>Juv.</th></tr>";
					
		for( var i = 1; i < lines.length; i++ ) {
		
			lines[i] = lines[i].trim();
		
			var chunks		= lines[i].split(' '),
				bandCode 	= chunks[0],
				count		= { total: 0, male: 0, female: 0, juvenile: 0, immature: 0 };
			
			if( !!! birdBrain[ bandCode ] ) {
			
				result += "<tr><td><b>Unreadable line:</b></td><td>" + lines[i] + "</td></tr>";
				
				continue;
			
			}
			
			for( var ii = 1; ii < chunks.length; ii++ ) {
				
				if( isNaN(chunks[ii]) ) {

					var chunkCount = "";
					
					for( var char = 0; char < chunks[ii].length; char++ ) {
					
						var character = chunks[ii][char];
						
						if( ! isNaN(character) ) {
						
							chunkCount += character;
						
						} else {
						
							switch( character ) {
							
								case "m":
								
									if( chunkCount )
										count.male += parseInt( chunkCount );
									else 
										count.male++;
										
									break;
									
								case "f":
								
									if( chunkCount )
										count.female += parseInt( chunkCount );
									else
										count.female++;
										
									break;
									
								case "j":
								
									if( chunkCount )
										count.juvenile += parseInt( chunkCount );
									else
										count.juvenile++;
										
									break;
									
								case "i":
								
									if( chunkCount )
										count.immature += parseInt( chunkCount );
									else
										count.immature++;
										
									break;

							}
							
							chunkCount = "";
						
						}
					
					}
				
					continue;
					
				}
				
				count.total += parseInt( chunks[ii] );
			
			}
			
			result += "<tr><td>" + birdBrain[ bandCode ].name + "</td><td>" + ( count.total + count.male + count.female+count.juvenile + count.immature ) + "</td><td>"+ ( count.female ? count.female : "-" ) +"</td><td>"+ ( count.male ? count.male : "-" ) +"</td><td>"+ ( count.immature ? count.immature : "-" ) +"</td><td>" + ( count.juvenile ? count.juvenile : "-" ) + "</td></tr>";
				
		
		}
		
		result += "</table>";
		
		resultHTML.innerHTML = result;
	
	}

	submitButton.addEventListener( 'touchend', window.processList );
	submitButton.addEventListener( 'click', window.processList );
	
	resetButton.addEventListener( 'touchend', window.resetList );
	resetButton.addEventListener( 'click', window.resetList );


}