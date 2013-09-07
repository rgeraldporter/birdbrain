
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
					"<table><tr><th>Species Name</th><th>Observed</th><th>Notes</th></tr>";
					
		for( var i = 1; i < lines.length; i++ ) {
		
			lines[i] = lines[i].trim();
		
			var chunks		= lines[i].split(' '),
				bandCode 	= chunks[0],
				count		= { total: 0, male: 0, female: 0, juvenile: 0, immature: 0, deceased: 0, notes: "" };				
			
			if( !!! birdBrain[ bandCode ] ) {
			
				result += "<tr><td><b>Unreadable line:</b></td><td>" + lines[i] + "</td></tr>";
				
				continue;
			
			}
			
			for( var ii = 1; ii < chunks.length; ii++ ) {
			
				var	prevNote	= !! isNote ? isNote : false,
					isNote		= false;
			
				if( isNaN(chunks[ii]) ) {

					var chunkCount = "";
					
					for( var char = 0; char < chunks[ii].length; char++ ) {
					
						// todo: account for 'mmfmfmffmj'-style notation
					
						var character 		= chunks[ii][char],
							nextCharacter	= chunks[ii][char+1] ? chunks[ii][char+1] : null,
							breakFor		= false,
							addNotes		= function( singleCharacterChunk ) {
						
								if( !!singleCharacterChunk || (!!nextCharacter && isNaN(nextCharacter)) ) {
									
									count.notes 	+= ( count.notes && !prevNote ) ? "<br />" + chunks[ii].substring(char) + " " : chunks[ii].substring(char) + " ";
									isNote			= true;
									
									return true;
									
								}
								
								return false;
							
							}
						
						if( ! isNaN(character) ) {
						
							chunkCount += character;
						
						} else {
						
							switch( character ) {
							
								case "m":
								
									if( addNotes() ) {
									
										breakFor = true;
										
										break;
									
									}
								
									if( chunkCount )
										count.male += parseInt( chunkCount );
									else 
										count.male++;
										
									break;
									
								case "f":
								
									if( addNotes() ) {
									
										breakFor = true;
										
										break;
									
									}
								
									if( chunkCount )
										count.female += parseInt( chunkCount );
									else
										count.female++;
										
									break;
									
								case "j":
								
									if( addNotes() ) {
									
										breakFor = true;
										
										break;
									
									}
								
									if( chunkCount )
										count.juvenile += parseInt( chunkCount );
									else
										count.juvenile++;
										
									break;
									
								case "i":
								
									if( addNotes() ) {
									
										breakFor = true;
										
										break;
									
									}
								
									if( chunkCount )
										count.immature += parseInt( chunkCount );
									else
										count.immature++;
										
									break;
									
								case "d":
								
									// append as note for eBird as well
									if( addNotes() ) {
									
										breakFor = true;
										
										break;
									
									}
								
									if( chunkCount )
										count.deceased += parseInt( chunkCount );
									else
										count.deceased++;
										
									break;
									
								default:
								
									if( addNotes(true) ) {
									
										breakFor = true;
										
										break;
									
									}
									
									break;

							}
							
							chunkCount = "";
						
						}
						
						if( !!breakFor )
							break;
					
					}
				
					continue;
					
				}
				
				count.total += parseInt( chunks[ii] );
			
			}
			
			result += "<tr><td>" + birdBrain[ bandCode ].name + "</td><td><b>" + ( count.total + count.male + count.female+count.juvenile + count.immature + count.deceased ) + "</b> "+ ( count.female ? count.female + "f " : "" ) + ( count.male ? count.male + "m " : "" ) + ( count.immature ? count.immature + "imm " : "" ) + ( count.juvenile ? count.juvenile + "juv" : "" ) + ( count.deceased ? count.deceased + "dec" : "" ) + "</td><td><em>"+ count.notes + ( count.deceased ? count.deceased + " found deceased." : "" ) +"</em></td></tr>";
				
		
		}
		
		result += "</table>";
		
		resultHTML.innerHTML = result;
	
	}

	submitButton.addEventListener( 'touchend', window.processList );
	submitButton.addEventListener( 'click', window.processList );
	
	resetButton.addEventListener( 'touchend', window.resetList );
	resetButton.addEventListener( 'click', window.resetList );


}