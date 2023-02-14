function readSingleFile(e) 
{
	var file = e.target.files[0];
	if (!file) {
		return;
	}
		
	var reader = new FileReader();
			
	reader.onload = function(e) 
	{
		var contents = e.target.result;
		var output = document.getElementById('output');
		output.innerHTML = generateHtml(contents);
					
	};
		reader.readAsText(file);
}

function getStringBetwenTags(str, startTag, endTag)
{		
	var startTagLen = startTag.length;
	if (startTagLen == 0)
	{
		return [];
	}
	var strings = [];
	var startIndex = 0;
	var index;
	var indices = [];
				
	while ((index = str.indexOf(startTag, startIndex)) > - 1){
		indices.push(index);
		startIndex = index + startTagLen;
		var endIndex = str.indexOf(endTag, startIndex) + endTag.length;
		strings.push({index:index, soap:str.substring(index, endIndex)})
	}		
	return strings
}
			
function convertStringsToXmls(soapStrings)
{		
	parser = new DOMParser();
	var result = [];
				
	for (let elem of soapStrings)
	{
		result.push(parser.parseFromString(elem.soap,"text/xml"));
	}
		return result;
			
}