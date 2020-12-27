function fun_handle() {
		  var indexc = document.getElementById("indexc");
		  var index = document.getElementById("index");
		  
		  var createc = document.getElementById("createc");
		  var create = document.getElementById("create");

		  var storec = document.getElementById("storec");
		  var store = document.getElementById("store");

		  var showc = document.getElementById("showc");
		  var show = document.getElementById("show");

		  var editc = document.getElementById("editc");
		  var edit = document.getElementById("edit");

		  var updatec = document.getElementById("updatec");
		  var update = document.getElementById("update");

		  var deletec = document.getElementById("deletec");
		  var deletes = document.getElementById("deletes");


		  if (indexc.checked != true){
		    index.style.display = "none";
		  } else {
		     index.style.display = "block";
		  }

		  if (createc.checked != true){
		    create.style.display = "none";
		  } else {
		     create.style.display = "block";
		  }

		  if (storec.checked != true){
		    store.style.display = "none";
		  } else {
		     store.style.display = "block";
		  }

		  if (showc.checked != true){
		    show.style.display = "none";
		  } else {
		     show.style.display = "block";
		  }

		  if (editc.checked != true){
		    edit.style.display = "none";
		  } else {
		     edit.style.display = "block";
		  }

		  if (updatec.checked != true){
		    update.style.display = "none";
		  } else {
		     update.style.display = "block";
		  }

		  if (deletec.checked != true){
		    deletes.style.display = "none";
		  } else {
		     deletes.style.display = "block";
		  }

		}

	function tablehandle(e){
		if(e.keyCode === 13){
            e.preventDefault(); // Ensure it is only this code that runs
            document.getElementById("hcol").style.display="block";
            document.getElementById("pn").style.display="none";
            document.getElementById("0").focus();
        }
	}

	var x = 0;
		function handle(e){
					var max_fields      = 50; //maximum input boxes allowed
		var wrapper   		= $(".input_fields_wrap"); //Fields wrapper
		var add_button      = $(".add_field_button"); //Add button ID
        if(e.keyCode === 13){
            e.preventDefault(); // Ensure it is only this code that runs


            var txt = document.getElementById(x.toString()).value ;
            var len =txt.split(" ").length;
            console.log(len<1);
            if (len >= 2)
			{
				
			      alert("column name cannot have space");
			      // console.log("Invalid Text");
			      return;
			}

            document.getElementById("pn").style.display="none";
            // document.getElementById("titles").style.display="none";
            if(x < max_fields){ //max input box allowed
				x++; //text box increment
				console.log(x.toString());
				 
			     // textbox.focus();
			     // textbox.scrollIntoView();
				$(wrapper).append('<div><input type="text" placeholder="column name" id="'+x+'" name="mytext[]" autofocus onkeypress="handle(event)" onkeypress="" oninput="myFunction()"/> <input type="checkbox" id="f'+x+'" onclick="myFunction()"><label for="f'+x+'">file</label>&nbsp&nbsp&nbsp&nbsp <input type="checkbox" id="r'+x+'" onclick="myFunction()"><label for="r'+x+'">required</label></div>'); //add input box
				document.getElementById(x.toString()).focus();
				myFunction();
			}
        }
    }


		
	$(document).ready(function() {
		var max_fields      = 50; //maximum input boxes allowed
		var wrapper   		= $(".input_fields_wrap"); //Fields wrapper
		var add_button      = $(".add_field_button"); //Add button ID
		
		 //initlal text box count
		$(add_button).click(function(e){ //on add input button click
			e.preventDefault();
			if(x < max_fields){ //max input box allowed
				x++; //text box increment
				$(wrapper).append('<div><input type="text" id="'+x+'" name="mytext[]" onkeypress="" oninput="myFunction()"/><button onclick="" class="remove_field">x</button></div>&nbsp&nbsp'); //add input box
			}
		});
		
		$(wrapper).on("click",".remove_field", function(e){ //user click on remove text
			e.preventDefault(); $(this).parent('div').remove(); x--;
		})
	});




	function myFunction() {
	var table_name = document.getElementById("tablename").value;
	var folder_name = document.getElementById("folder").value+".";


	    var cols = [];
	// for (i = 0; i < x; i++) {
	//   var gcol = document.getElementById(i.toString()).value;

	// }

	var delete_file ="";
	var store_validate = "";
	var store_request = "";

	var table_value = "";
	var table_cols = "";

	var api_resource = "";

	
	for (i = 0; i < x; i++) {
	  var gcol = document.getElementById(i.toString()).value;
	  var checkBoxf = document.getElementById("f"+i);


	  if (checkBoxf.checked == true){

	  	store_request += `
        if($request->file('`+gcol+`')) {
            $upload = $request->file('`+gcol+`');
            $fileformat = time() . '.' . $upload->getClientOriginalName();
            if ($upload->move('uploads/`+ table_name.toLowerCase() +`/', $fileformat)) {
                $`+ table_name.toLowerCase() +`->`+gcol+` = $fileformat;
            }
        }<br>
`

        delete_file += `
        if($`+ table_name.toLowerCase() +`->`+gcol+`!=="no-image.png"){
            unlink('uploads/`+ table_name.toLowerCase() +`/'.$`+ table_name.toLowerCase() +`->`+gcol+`);
        }<br>`

        table_value += `                            &lt;td&gt;&lt;img src="{{asset("uploads/`+ table_name.toLowerCase() +`/".$`+ table_name.toLowerCase() +`->`+gcol+`)}}" width=100&gt;&lt;/td&gt;<br>`

        api_resource += `            '`+gcol+`' => $url."/uploads/`+ table_name.toLowerCase() +`/".$this->`+gcol+`,<br>`

	  }else{

	  	store_request += `        $`+ table_name.toLowerCase() +`->`+gcol+` = $request->`+gcol+`;<br>`	
	  	table_value += `                            &lt;td&gt;{{$`+ table_name.toLowerCase() +`->`+gcol+`}}&lt;/td&gt;<br>`
        table_cols += `                            &lt;th&gt;`+gcol+`&lt;/th&gt;<br>`
        api_resource += `            '`+gcol+`' => $this->`+gcol+`,<br>`
        
	  }
	  
	  var checkBoxr = document.getElementById("r"+i);
	  if (checkBoxr.checked == true){
	    store_validate += `         '`+gcol+`'=>'required',<br>`
	  }

	}
	// for (j = 0; j < x; j++) {
	//   var gcol = document.getElementById(j.toString()).value;
	//   store_request += `$`+ table_name.toLowerCase() +`->`+gcol+`=$request->`+gcol+`;<br>`
	// }



	// var cols = [];
	// for (i = 0; i < x; i++) {
	//   cols[i] = document.getElementById(i.toString()).value;
	// }
	var newFolderDot="";
	var text = document.getElementById(i.toString()).value
	if(folder_name!=="."){
		newFolderDot=folder_name;
	}else{
		newFolderDot="";
	}
	
	  // index function
	  document.getElementById("index").innerHTML = `
    public function index()
    {
        $`+table_name.toLowerCase()+`s = `+ table_name +`::orderBy('updated_at','desc')->get();
        return view('` + newFolderDot + table_name.toLowerCase() + `s.index',compact('`+ table_name.toLowerCase() +`s')); 
    }`;

	// Create function
	document.getElementById("create").innerHTML = `
    public function create()
    {
        return view('` + newFolderDot + table_name.toLowerCase() + `s.create');
    }`;

    // store function
    var store_code = `
    public function store(Request $request)
    {
         $this->validate($request,[<br>`
         +store_validate+`

        ]);
        $`+ table_name.toLowerCase() +` = new `+ table_name +`();
        <br>`
        + store_request+`         $`+ table_name.toLowerCase() +`->`+text+`=$request->`+text+`;<br>

        if($` + table_name.toLowerCase() + `->save()){
            return redirect()->back()->with('success',' ` + table_name.toLowerCase() + ` Added successfully.');
        }
        else{
            return redirect()->back()->with('unsuccess','Failed try again.');
        }

    }`;

	document.getElementById("store").innerHTML = store_code;


	// show function
	document.getElementById("show").innerHTML = `
    public function show($id)
    {
    	$`+ table_name.toLowerCase() + `=` + table_name + `::findOrFail($id);
        return view('` + newFolderDot + table_name.toLowerCase() + `s.show',compact('` + table_name.toLowerCase() + `'));
    }`;


    // edit function
	document.getElementById("edit").innerHTML = `
    public function edit($id)
    {
    	$`+ table_name.toLowerCase() + `=` + table_name + `::findOrFail($id);
        return view('` + newFolderDot + table_name.toLowerCase() + `s.edit',compact('` + table_name.toLowerCase() + `'));
    }`;

    // update function
	var update_code = `
    public function update(Request $request, $id)
    {
    	$this->validate($request,[<br>`
    	+store_validate+`
    	]);<br>

    	$`+ table_name.toLowerCase() +`=`+ table_name +`::findOrFail($id);<br>`
    	+ store_request+`         $`+ table_name.toLowerCase() +`->`+text+`=$request->`+text+`;<br>

    	if($` + table_name.toLowerCase() + `->update()){
    	    return redirect()->back()->with('success',' ` + table_name.toLowerCase() + ` Added successfully.');
    	}
    	else{
    	    return redirect()->back()->with('unsuccess','Failed try again.');
    	}
	       
    }`;
	    document.getElementById("update").innerHTML = update_code;



	// delete function
	var delete_code = `
    public function delete($id)
    {
    	$`+ table_name.toLowerCase() + `=` + table_name + `::findOrFail($id);
    	`+ delete_file +`
    	if(`+ table_name + `::where('id',$id)->delete()){
         return redirect()->back()->with('success',' `+ table_name + ` deleted successfully.');
        }
        else{
            return redirect()->back()->with('unsuccess','Failed try again.');
        }
    }`;
    document.getElementById("deletes").innerHTML = delete_code;


    // Index file table code
    
document.getElementById("htmlTable").innerHTML = `
            &lt;div class="box-header"&gt;
                &lt;div class="row mt-3"&gt;
                    &lt;div class="col-md-6"&gt;
                        &lt;h3 class="box-title text-color"&gt;Slide Images&lt;/h3&gt;

                    &lt;/div&gt;
                    &lt;div class="col-md-6 text-right"&gt;
                        &lt;a href="{{route('`+ table_name.toLowerCase() +`s.create')}}" class="btn btn-sm px-4 btn-custom"&gt;&lt;i class="fa fa-plus"&gt;&lt;/i&gt;&nbsp; Add new Image&lt;/a&gt;

                    &lt;/div&gt;
                &lt;/div&gt;
 			&lt;/div&gt;
 			&lt;div class="box-body"&gt;
 			 	&lt;table id="table_id" class="table display responsive nowrap" width="100%"&gt;
 			 		&lt;thead&gt;
 			 		 	 &lt;tr&gt;
                            &lt;th&gt;SR NO&lt;/th&gt;<br>`
                            +table_cols+`
                            &lt;th&gt;`+text+`&lt;/th&gt;
                            &lt;th&gt;Action&lt;/th&gt;
 			 		 	 &lt;/tr&gt;
 			 		&lt;/thead&gt;
 			 		&lt;tbody&gt;
 			 		  	&lt;?php $i=1;?&gt;
                        @foreach($`+ table_name.toLowerCase() +`s as $`+ table_name.toLowerCase() +`)
                            &lt;tr&gt;
                            &lt;td&gt;{{$i}}&lt;/td&gt;<br>`
                            +table_value+`
                             &lt;td&gt;{{$`+ table_name.toLowerCase() +`->`+text+`}}&lt;/td&gt;<br>

                            &lt;td&gt;
                                &lt;div class="row"&gt;
                                    &lt;div class="col-md-2"&gt;
                                        &lt;a href="{{route('`+ table_name.toLowerCase() +`s.edit',$`+ table_name.toLowerCase() +`->id)}}" class=" " style="margin-left: 5px;"&gt;&lt;i class="fa fa-edit icon fa-1x"&gt;&lt;/i&gt; &lt;/a&gt;

                                    &lt;/div&gt;
                                    &lt;div class="col-md-2"&gt;
                                        &lt;form action="{{ route('`+ table_name.toLowerCase() +`s.destroy',$`+ table_name.toLowerCase() +`->id)}}" method="POST"&gt;
                                            @csrf
                                            @method('DELETE')
                                            &lt;button type="submit"  class="" style="margin-left: 5px;"&gt;
                                                &lt;i class="fa fa-trash icon fa-1x"&gt;&lt;/i&gt;&lt;/button&gt;
                                        &lt;/form&gt;
                                    &lt;/div&gt;
                                    &lt;div class="col-md-2"&gt;
                                        &lt;a href="{{route('`+ table_name.toLowerCase() +`s.show',$`+ table_name.toLowerCase() +`->id)}}" style="margin-left: 5px;" class="icon"&gt;&lt;i class="fa fa-eye  fa-1x" &gt;&lt;/i&gt;&ensp;&lt;/span&gt;&lt;/a&gt;

                                    &lt;/div&gt;
                                &lt;/div&gt;
                            &lt;/td&gt;
                            &lt;/tr&gt;
                        &lt;?php $i++?&gt;
                        @endforeach
 			 		&lt;/tbody&gt;
 			 	&lt;/table&gt;
 			 &lt;/div&gt;

`;


// 
// 
// API code starts form here
// 
// 

document.getElementById('apiResource').innerHTML = `
    public function toArray($request)
    {
        $url=URL::to('/');
        return [
            'id' =>$this->id,<br>`
            +api_resource+
            `
        ];
    }

`


// document.getElementById('apiController').innerHTML = `

// `

// API index function
	document.getElementById("apiindex").innerHTML = `
    public function index()
    {
    	return `+table_name+`Resource::collection(`+table_name+`::all());
        
    }`;


    // API store function
    var apistore_code = `
    public function store(Request $request)
    {
         $this->validate([<br>`
         +store_validate+`

        ]);
        $`+ table_name.toLowerCase() +` = new `+ table_name +`();
        <br>`
        + store_request+`         $`+ table_name.toLowerCase() +`->`+text+`=$request->`+text+`;<br>

        if($` + table_name.toLowerCase() + `->save()){
            return response()->json([ 
                    'status'=>'S',
                    
                    
                    ]);
        }
        else{
            return response()->json([ 
                    'status'=>'F',
                   
                    
                    ]);
        }

    }`;

    document.getElementById("apistore").innerHTML = apistore_code;



// API update function
	var apiupdate_code = `
    public function update(`+ table_name.toLowerCase() +`Request $request, $id)
    {
    	$this->validate($request,[<br>`
    	+store_validate+`
    	]);<br>

    	$`+ table_name.toLowerCase() +`=`+ table_name +`::findOrFail($id);<br>`
    	+ store_request+`         $`+ table_name.toLowerCase() +`->`+text+`=$request->`+text+`;<br>

    	if($item->update()){
           return [
               'status' => 'S',
           ];
        }else{
            return [
                'status' => 'F',
            ];
        }
        return $request;   
	       
    }`;
	    document.getElementById("apiupdate").innerHTML = apiupdate_code;



// API delete function
	var apidelete_code = `
    public function delete($id)
    {
    	$`+ table_name.toLowerCase() + `=` + table_name + `::findOrFail($id);
    	`+ delete_file +`
    	if(`+ table_name + `::where('id',$id)->delete()){
         return "S";
        }
        else{
            return "F";
        }
    }`;
    document.getElementById("apideletes").innerHTML = apidelete_code;




}
