// Prefill
function prefill()
{	var msg=new URLSearchParams(window.location.search).get('message');
	if(msg!=null) theString=msg.toUpperCase().replace(/[^ A-ZÄÖÜ]/g,"");
	ticTacToer();
}

// Recognize keypresses and send appropriate typeChar() command to type the character
document.addEventListener('keydown',function(event)
{	if(/^[A-ZÄÖÜ]$/i.test(event.key))	typeChar(event.key);
	else if(event.code==='Space')		typeChar(' ');
	else if(event.code==='Backspace')	typeChar();
});

// Handle user typing a new character by appending it to variable,
// When no new character is passed is interpreted as a backspace
function typeChar(character=null)
{	// Get the user's typed text from theString to operate on locally
	var notepad=theString;
	
	// Handle backspaces by trimming the last character off
	if(character==null)
		notepad=notepad.slice(0,-1);
	// Otherwise, append the passed variable to notepad variable
	else
		notepad+=character;
	
	// Load the modified local string into the global variable then reform textboxes
	theString=notepad.toUpperCase();
	ticTacToer();
}

// Clear the textbox by emptying theString and refilling the textboxes to match
function clearNotepad()
{	theString="";	// Override global variable with an empty string
	ticTacToer();	// Update textboxes following change
}

function ticTacToer()
{	notepad="";	// Establish variable to build innerHTML of plaintext textbox
	codepad="";	// Establish variable to build innerHTML of tictactoe textbox
	
	// First handle edge case for when string is empty, if not fill the textboxes:
	if(theString=="")
	{	notepad="<span>&nbsp;</span>";
		codepad="<span class='boxedChar'>&nbsp;</span>";
	}
	else
	{	// Iterate through each character and add them to the textboxes appropriately
		for(const ch of theString)
		{	// If char is a space, append the space to each textbox
			if(ch==' ')
			{	notepad+="<span> &ZeroWidthSpace;</span>";	//notepad+="<span class='boxedChar'> </span>";
				codepad+="<span class='boxedChar'> </span>";
			}
			// Otherwise, if char is a capital letter, append to each text box
			else if(/^[A-ZÄÖÜ\@]$/.test(ch))
			{	notepad+="<span>"+ch+"</span>";
				codepad+="<span class='boxedChar "+ch+"'>";
			
				if(/^[A-I]$/.test(ch))		codepad+="&nbsp;";
				else if(/^[J-R]$/.test(ch))	codepad+="X";
				else if(/^[S-Z\@]$/.test(ch))	codepad+="O";
				else if(/^[ÄÖÜ]$/.test(ch))	codepad+="&bullet;";
				
				codepad+="</span>";
			}
		}
	}
	
	// Override the textboxes with their newly formed innerHTML
	document.getElementById('notepad').innerHTML=notepad;
	document.getElementById('codepad').innerHTML=codepad;
}

async function copyToClipboard()
{	await navigator.clipboard.writeText(theString);
}

function getTextFromAlert()
{	let newString=window.prompt("");
	theString=newString.toUpperCase().replace(/[^ A-ZÄÖÜ]/g,"");
	ticTacToer();
}

async function getTextFromClipboard()
{	try
	{	const newString=await navigator.clipboard.readText();
		theString=newString.toUpperCase().replace(/[^ A-ZÄÖÜ]/g,"");
		ticTacToer();
	}
	catch (err)
	{	console.error("Failed to read clipboard: ",err);
	}
}