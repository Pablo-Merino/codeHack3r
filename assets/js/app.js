$(function() {

	window.onbeforeunload = function() { 
		return "You may have unsaved changes, do you really want to close?";
	}
	
	localStorage['filename'] = "file.html";
	
	var versionNumber = "0.2 beta";
	var cmEditor = CodeMirror(document.getElementById('code'), {
		mode:  "text/html",
		lineNumbers:true,
		lineWrapping:true,
		onCursorActivity: function() {    
			cmEditor.setLineClass(hlLine, null);
			hlLine = cmEditor.setLineClass(cmEditor.getCursor().line, "activeline");  
		}
	});

	var hlLine = cmEditor.setLineClass(0, "activeline");

	$('.CodeMirror-scroll').height( $(window).height() + "px" );

	$(".CodeMirror textarea").focus();
	$(".dropdown-menu a").click(function(){
		switch($(this).attr("class")) {
			case "css":
				$(".btn-group span.btn").text("CSS");
				cmEditor.setOption("mode", "text/css");
				localStorage['filename'] = "file.css";
				cmEditor.focus();
				break;
			case "html":
				$(".btn-group span.btn").text("HTML");
				cmEditor.setOption("mode", "text/html");
				localStorage['filename'] = "file.html";
				cmEditor.focus();
				break;
			case "js":
				$(".btn-group span.btn").text("Javascript");
				cmEditor.setOption("mode", "text/javascript");
				localStorage['filename'] = "file.js";
				cmEditor.focus();
				break;
			case "md":
				$(".btn-group span.btn").text("Markdown");
				cmEditor.setOption("mode", "text/x-markdown");
				localStorage['filename'] = "file.md";
				cmEditor.focus();
				break;
			case "mysql":
				$(".btn-group span.btn").text("MySQL");
				cmEditor.setOption("mode", "text/x-mysql");
				localStorage['filename'] = "file.sql";
				cmEditor.focus();
				break;
			case "perl":
				$(".btn-group span.btn").text("Perl");
				cmEditor.setOption("mode", "text/x-perl");
				localStorage['filename'] = "file.pl";
				cmEditor.focus();
				break;
			case "php":
				$(".btn-group span.btn").text("PHP");
				cmEditor.setOption("mode", "application/x-httpd-php");
				localStorage['filename'] = "file.php";
				cmEditor.focus();
				break;
			case "python":
				$(".btn-group span.btn").text("Python");
				cmEditor.setOption("mode", "text/x-python");
				localStorage['filename'] = "file.py";
				cmEditor.focus();
				break;
			case "ruby":
				$(".btn-group span.btn").text("Ruby");
				cmEditor.setOption("mode", "text/x-ruby");
				localStorage['filename'] = "file.rb";
				cmEditor.focus();
				break;
			case "xml":
				$(".btn-group span.btn").text("XML");
				cmEditor.setOption("mode", "application/xml");
				localStorage['filename'] = "file.xml";
				cmEditor.focus();
				break;
			
		}
	});
	var savedOnce = false;
	$('.CodeMirror textarea').keydown(function(event) {
		if(cmEditor.getValue()) {
			$(".toolsbox .notice").html("<span class=\"label label-warning\">Unsaved</span>");
		} else if(!savedOnce) {
			$(".toolsbox .notice").html("<span class=\"label\">Start writing</span>");	
		}
	});
	$(window).keypress(function(event) {
		if(cmEditor.getValue() || savedOnce) {
			if (!(event.which == 115 && event.ctrlKey) && !(event.which == 19)) return true;
    		saveCMEditorData();
			event.preventDefault();

    		return false;
		}
	});
	$("#newFile").click(function(){
		cmEditor.setValue("");
		saveCMEditorData();
	});
	$("#downloadFile").click(function(){
		saveCMEditorData();
		$(".toolsbox .notice").html("<span class=\"label label-info\">Downloaded :)</span>");
		var bb = new BlobBuilder;
		bb.append(localStorage[localStorage['filename']]);
		saveAs(bb.getBlob("application/octet-stream;charset=utf-8;Content-disposition: attachment; filename="+localStorage['filename']), localStorage['filename']);
	});
	$("#appBtns").tooltip({
      selector: "a[rel=tooltip]",
      placement:"left"
    });
    $("#aboutModal").on('click',function() {
    	console.log("dafuq");
    	$(".modal-header #modalTitle").html("About codeHack3r ("+versionNumber+")");
    	$(".modal-body #modalBody").html("codeHack3r is an online tool to write code. It uses:<ul><li>Twitter Bootstrap for basic styles</li><li>CodeMirror for code editor</li></ul>It's actually pretty basic, but take for granted that this will be your online IDE of preference!<br/>");
    	$('.modal').modal({
  			keyboard: false
		});
		$(".errorZone").slideUp();

    });
    $("#uploadFile").click(function() {
    	$(".modal-header #modalTitle").html("Upload file");
	$(".modal-body #modalBody").html('<input type="file" id="files" name="file" /><br/><a href="#" class="btn" id="submitForm">Upload</a>');

    	$('.modal').modal({
  			keyboard: false
		});
    });
    $("#submitForm").live("click",function() {
    	readUploadedFile();
    });
	function saveCMEditorData() {
		var filename = localStorage['filename'];
		localStorage[filename] = cmEditor.getValue()+"\n";
		savedOnce = true;
		$(".toolsbox .notice").html("<span class=\"label label-success\">Saved</span>");
	}
	function readUploadedFile() {
		var files = document.getElementById('files').files;
		if (!files.length) {
			$(".errorZone").html('<div class="alert alert-error"><strong>Error!</strong> Please select a file!</div>').slideDown();
			return;
		}
		var file = files[0];
		var reader = new FileReader();
		reader.onloadend = function(fileBlob) {
			if (fileBlob.target.readyState == FileReader.DONE) { 
				switch(file.name.split('.').pop()) {
					case "css":
						$(".btn-group span.btn").text("CSS");
						cmEditor.setOption("mode", "text/css");
						cmEditor.focus();
						break;
					case "html":
						$(".btn-group span.btn").text("HTML");
						cmEditor.setOption("mode", "text/html");
						cmEditor.focus();
						break;
					case "js":
						$(".btn-group span.btn").text("Javascript");
						cmEditor.setOption("mode", "text/javascript");
						cmEditor.focus();
						break;
					case "md":
						$(".btn-group span.btn").text("Markdown");
						cmEditor.setOption("mode", "text/x-markdown");
						cmEditor.focus();
						break;
					case "sql":
						$(".btn-group span.btn").text("MySQL");
						cmEditor.setOption("mode", "text/x-mysql");
						cmEditor.focus();
						break;
					case "pl":
						$(".btn-group span.btn").text("Perl");
						cmEditor.setOption("mode", "text/x-perl");
						cmEditor.focus();
						break;
					case "php":
						$(".btn-group span.btn").text("PHP");
						cmEditor.setOption("mode", "application/x-httpd-php");
						cmEditor.focus();
						break;
					case "py":
						$(".btn-group span.btn").text("Python");
						cmEditor.setOption("mode", "text/x-python");
						cmEditor.focus();
						break;
					case "rb":
						$(".btn-group span.btn").text("Ruby");
						cmEditor.setOption("mode", "text/x-ruby");
						cmEditor.focus();
						break;
					case "xml":
						$(".btn-group span.btn").text("XML");
						cmEditor.setOption("mode", "application/xml");
						cmEditor.focus();
						break;
					
				}
				var fileCnt = fileBlob.target.result;
				localStorage['filename'] = file.name;
				localStorage[file.name] = fileCnt;
				cmEditor.setValue(fileCnt);
				$(".errorZone").slideUp();
				$('.modal').modal("hide");

			}
		};
		if (file.webkitSlice) {
			var blob = file.webkitSlice(0, file.size);
		} else if (file.mozSlice) {
			var blob = file.mozSlice(0, file.size);
		}
		reader.readAsBinaryString(blob);
	}
});