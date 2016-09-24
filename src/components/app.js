import React, { Component } from 'react';

//button component
var Button = React.createClass({
	render(){	
		//if there is isEnabled prop - set class ".enabled"	
		return(
			<button 
				className={this.props.isEnabled&&"enabled"} 
				onClick={this.props.onClick}
			>
				{this.props.text}
			</button>
		); 
	}
});	

//select form element
var Select = React.createClass({
	getInitialState(){
		return {
			value: this.props.default
		};
	},
	handleChange(e){
		var value = e.target.value;
		this.setState({value: value});
		this.props.select(value);
	},
	//if nextProps.value changed - will change the state
	componentWillReceiveProps(nextProps){
		this.setState({
			value: nextProps.value
		});
	},
	render(){
		return (
			<select value={this.state.value} onChange={this.handleChange}>
				{this.props.options.map(
					(option, i)=>(
						<option value={option} key={i}>
							{option}
						</option>
					)
				)}				
			</select> 
		);
	}	
});

//predefined patterns of Game of Life
var Patterns = {
	glider: [
		[0,0,1],
		[1,1,0],
		[0,1,1]
	],
	"glider gun":[
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0],
		[0,1,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,1,1,0,0,0,0,0,0,0,0,1,0,0,0,1,0,1,1,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]		
	],
	spaceship:[
		[1,0,0,1,0],
		[0,0,0,0,1],
		[1,0,0,0,1],
		[0,1,1,1,1]
	],
	"R-pentomino":[
		[0,0,0,0,0],
		[0,0,1,1,0],
		[0,1,1,0,0],
		[0,0,1,0,0],
		[0,0,0,0,0]
	],
	"diehard":[
		[0,0,0,0,0,0,0,0,0,0],		
		[0,0,0,0,0,0,0,1,0,0],
		[0,1,1,0,0,0,0,0,0,0],
		[0,0,1,0,0,0,1,1,1,0],
		[0,0,0,0,0,0,0,0,0,0]
	],
	"pulsar":[
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,1,1,1,0,0,0,1,1,1,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,1,0,0,0,0,1,0,1,0,0,0,0,1,0,0],
		[0,0,1,0,0,0,0,1,0,1,0,0,0,0,1,0,0],
		[0,0,1,0,0,0,0,1,0,1,0,0,0,0,1,0,0],
		[0,0,0,0,1,1,1,0,0,0,1,1,1,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,1,1,1,0,0,0,1,1,1,0,0,0,0],
		[0,0,1,0,0,0,0,1,0,1,0,0,0,0,1,0,0],
		[0,0,1,0,0,0,0,1,0,1,0,0,0,0,1,0,0],
		[0,0,1,0,0,0,0,1,0,1,0,0,0,0,1,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,1,1,1,0,0,0,1,1,1,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
	],
	"unnamed":[
		[0,0,0,0,0,0,0],
		[0,1,1,1,0,1,0],
		[0,1,0,0,0,0,0],
		[0,0,0,0,1,1,0],
		[0,0,1,1,0,1,0],
		[0,1,0,1,0,1,0],
		[0,0,0,0,0,0,0]
	]
}	

//main component
var App = React.createClass({		
	getInitialState(){				
		//initially the game board will be filled randomly
		var board = this.getRandomArray(50,30);	 
		return {
			//300 - "fast" speed
			speed: 300,			
			canvasSize:{
				width:550,
				height:350
			},
			canvas: null,
			context: null,
			//generations counter
			step: 0,
			//2d array to store values of the cells
			//0 is dead, 1 is newborn, 2 is older one
			board: board,
			//should we run draw() ?			
			shouldDraw: true,	
			//should we call draw() recursively?
			shouldLoop: true,
			//buttons state, if true - button has .enabled class
			buttons: {
				run: true,
				clear: false,
				pause: false
			},
			//select option values			
			sizes: ["50x30","70x50","100x80"],		
			speeds: ["slow","medium","fast"],			
			patterns: [
					"random", "glider", 
					"glider gun","pulsar", 
					"spaceship","R-pentomino",
					"diehard","unnamed","clear board"],
			//currently selected pattern		
			activePattern: "random"					
		}
	},

	//generate array of random figures
	getRandomArray(width, height){		
		var result = [];
		for(var i=0; i<height; i++){
			var temp=[];
			for(var j=0; j<width; j++){
				//0 or 2
				var n = Math.random()>0.5?2:0; 
				temp.push(n);
			}
			result.push(temp);
		}				
		return result;
	},

	//get array filled with 0
	getCleanArray(){
		var array = [];
		
		for(var i=0; i<this.state.board.length; i++){
			var row=[];
			for(var j=0; j<this.state.board[0].length; j++){
				row.push(0);	
			}
			array.push(row);
		}
		return array;
	},

	//setting canvas and context state
	componentDidMount(){				
		var canvas = document.getElementById("canvas");
	    var ctx = canvas.getContext("2d");	    	    
    	this.setState({canvas:canvas, context:ctx}, ()=> {this.draw();});		       	
	},

	//draw empty board. At this point all the cells are 'dead'
	drawBoard(){
		var ctx = this.state.context;			
		//cleaning board  				
		ctx.fillStyle = "#fff";		
		ctx.fillRect (0, 0, this.state.canvasSize.width, 
		this.state.canvasSize.height);                  
		ctx.fillStyle = "#eee";
		ctx.fillRect (25, 25, this.state.canvasSize.width-50, 
		this.state.canvasSize.height-50);                  

		//drawing text
		ctx.fillStyle = "#777";
		ctx.font = "16px arial";
		ctx.fillText("Yonger", 25, this.state.canvasSize.height-7);
		ctx.fillText("Older", 120, this.state.canvasSize.height-7);
		ctx.fillText("Generation:", 25, 18);
		ctx.fillStyle = "rgb(140, 198, 101)";
		ctx.fillRect (85, this.state.canvasSize.height-17, 10, 10);                  
		ctx.fillStyle = "rgb(30, 104, 35)";
		ctx.fillRect (100, this.state.canvasSize.height-17, 10, 10);                				
		
		ctx.fillStyle = "#777";
		ctx.font = "16px arial";
		ctx.fillText(this.state.step, 115, 18);

		//drawing grids
		ctx.strokeStyle = "#fff";

		for(var i=35; i<=this.state.canvasSize.height-35; i+=10){        
			ctx.beginPath();
			ctx.moveTo(25,i);
			ctx.lineTo(this.state.canvasSize.width-25,i);      
			ctx.stroke();
		}
		for(var i=35; i<=this.state.canvasSize.width-35; i+=10){        
			ctx.beginPath();
			ctx.moveTo(i,25);
			ctx.lineTo(i,this.state.canvasSize.height-25);      
			ctx.stroke();
		}
	},

	//caller - string parameter - to identify where the function is called from
	draw(caller){	
		setTimeout(function(){

			//the game has stopped
			if(!this.state.shouldDraw)					
				return;		

			//draw the board
			this.drawBoard();		

			var ctx = this.state.context;			
			var board = this.state.board;
			
			//draw our cells 
			//0 - dead, 1 - 'yong', 2 - 'old'
			for(var i=0; i<board.length; i++){
				for(var j=0; j<board[i].length; j++){
					var cell = board[i][j];
					if(cell===0)continue;

					//newborn cell
					if(cell===1)
						ctx.fillStyle = "rgb(140, 198, 101)";

					//old cell
					else 
						ctx.fillStyle = "rgb(30, 104, 35)";

					ctx.fillRect (25+j*10, 25+i*10, 10, 10);             
				}
			}

	      
			//in here we store next generation board
			var nextBoard=[];
			for (var i = 0; i < board.length; i++)
				nextBoard.push(board[i].slice(0)); 

			//how many 'alive' cells are in the board?
			var aliveCells=0;

	        for(var i=0; i<nextBoard.length; i++){
	          for(var j=0; j<nextBoard[i].length; j++){            
	          	
	          	if(board[i][j]>0)
	          		aliveCells++;

	            //analize neighbour cells
	            var count=0;
	            if(board[i][j]==1)
	              nextBoard[i][j]=2;

	            for(var m=i-1; m<=i+1; m++){
	              for(var n=j-1; n<=j+1; n++){
	                if(m===i&&n===j){                  
	                  continue;
	                }

	                var row=m;
	                var col=n;

	                if(m>=board.length)
	                  row=0;
	                else if(m<0)
	                  row=board.length-1;

	                if(n>=board[0].length)
	                  col=0;
	                else if(n<0)
	                  col=board[0].length-1;	                

	                if(board[row][col]>0){                                    
	                  count++;              
	                }
	              }
	            }                        

	            //the cell must die
	            if(count<2||count>3)
	              nextBoard[i][j]=0;
	          	//if the cell is dead - make reincarnation!	          	
	            else if(count==3&&board[i][j]===0){      
	              nextBoard[i][j]=1;              
	            }            
	          }
	        }   

	        //all the cells are 'dead', stop the game
	        if(!aliveCells){        
	        	return;
	        }

	        //if the function called not from click handler - update state
	        if(caller!="handleCanvasClick")        	
	        	this.setState({board: nextBoard, step: this.state.step+1});        

	        //should we run draw one more time?
	        if(this.state.shouldLoop)
	        	requestAnimationFrame(this.draw());

		}.bind(this), this.state.speed);			

	},//end of draw

	//select sizes onChange listener
	selectSize(size){		
		var width=0;
		var height=0;
		switch(size){
			case "50x30":
				width=550;
				height=350;
				break;
			case "70x50":
				width=750;
				height=550;
				break;
			case "100x80":
				width=1050;
				height=850;
		}

		//if we didn't change the size - do nothing
		if(this.state.canvasSize.width==width)
			return;		

		//create an array with new sizes
		var rows = (height-50)/10;
		var cols = (width-50)/10;		
		var board = [];			
	    for(var i=0; i<rows; i++){
	      var temp=[];
	      for(var j=0; j<cols; j++){	      	
	        temp.push(0);
	      }
	      board.push(temp);
	    }

	    //reset game board and stop the game change width, height state
		this.setState({	
			activePattern: "clear board",
			step: 0,				
			board: board,
			canvasSize:{
				width: width,
				height: height
			},
			buttons: {
				run: false,
				clear: true,
				pause: false
			},		
			shouldDraw: true,
			shouldLoop: false
		}, ()=>{ this.drawBoard()});					

	}, //end of selectSize

	//select speed onChange listener
	selectSpeed(speed){
		switch(speed){
			case "fast":
				this.setState({speed:300});		
				break;
			case "medium":
				this.setState({speed:800});		
				break;
			case "slow":
				this.setState({speed:1200});						
		}		
	},

	//select pattern onChange listener
	selectPattern(pattern){
		//pause the game 
		this.setState({shouldDraw: false, shouldLoop: false});
		var array=null;
		var buttons=null;
		switch(pattern){
			//get array filled with 0 and 1 randomly
			case "random":
				array=this.getRandomArray(this.state.board[0].length, 
				this.state.board.length);
				break;
			//clear array - user gets empty board	
			case "clear board":
				array = [];
				for(var i=0; i<this.state.board.length; i++){
					var row=[];
					for(var j=0; j<this.state.board[0].length; j++){
						row.push(0);	
					}
					array.push(row);
				}
				buttons = {
					run: false,
					clear: true,
					pause: false
				};
				break;
			//get array filled by pattern	
			default:
				array = this.getCleanArray();				
				var temp = Patterns[pattern];
				var dRow = Math.floor((this.state.board.length-temp.length)/2);
				var dCol = Math.floor((this.state.board[0].length-temp[0].length)/2);
				for(var row=0; row<temp.length; row++){					
					for(var col=0; col<temp[0].length; col++){						
						array[row+dRow][col+dCol]=temp[row][col];
					}					
				}
		}

		if(!buttons)
			buttons = {
				run: false,
				clear: false,
				pause: true
			}; 

		this.setState({
			activePattern: pattern,
			board: array,
			shouldDraw: true,
			shouldLoop: false,
			step: 0,
			activePattern: pattern,
			buttons: buttons 
		}, ()=> this.draw());
	},

	//run button onClick handler
	//start the game
	run(){
		this.setState({
			buttons: {
				run: true,
				clear: false,
				pause: false
			},
			shouldDraw: true,
			shouldLoop: true

		}, ()=> {this.draw();});	

	},
	//run button onClick handler
	//clear the board and reset the game
	clear(){		
		var cleanBoard = this.getCleanArray();		

		this.setState({			
			step: 0,
			board: cleanBoard,							
			buttons: {
				run: false,
				clear: true,
				pause: false
			},
			shouldDraw: true,
			shouldLoop: false,
			activePattern: "clear board"

		}, ()=> {this.draw()});	
	},

	//pause button onClick handler
	pause(){
		this.setState({
			buttons: {
				run: false,
				clear: false,
				pause: true
			},
			shouldDraw: true,
			shouldLoop: false
		});				
	},

	//to get mouse coordinates
	getMousePos(canvas, evt) {		
		var rect = canvas.getBoundingClientRect(), // abs. size of element
		scaleX = canvas.width / rect.width,    // relationship bitmap vs. element for X
		scaleY = canvas.height / rect.height;  // relationship bitmap vs. element for Y

		return {
			x: (evt.clientX - rect.left) * scaleX,   // scale mouse coordinates after they have
			y: (evt.clientY - rect.top) * scaleY     // been adjusted to be relative to element
		}
	},

	handleCanvasClick(e){
		//get mouse click coordinates
		var pos = this.getMousePos(this.state.canvas,e);		
		var i=Math.floor((pos.y-25)/10)
		var j=Math.floor((pos.x-25)/10);		
		//if the click event was on the board
		if((j>=0&&j<this.state.board[0].length)&&(i>=0&&i<this.state.board.length)){
			//if the cell was 'dead' set the cell 'newborn' (0 to 1)
			if(!this.state.board[i][j]){
				var newBoard = this.state.board.slice(0);
				newBoard[i][j]=1;					
				this.setState({board: newBoard}, this.draw("handleCanvasClick"));								
			}	
		}
	},

	render() {		
		var divWidth = {width: this.state.canvasSize.width+2+"px"};				
	    return (
	      <div id="gameBox" style={divWidth}>
	      	<div className="text-center"> 
	      		<h1>Conway's Game of Life</h1>
	      	</div>
			<div className="button-group">
				<Button text="Run" isEnabled={this.state.buttons.run} onClick={this.run}/>			
				<Button text="Pause"  isEnabled={this.state.buttons.pause} onClick={this.pause}/>			
				<Button text="Clear"  isEnabled={this.state.buttons.clear} onClick={this.clear}/>						
			</div>

			<canvas 
				id="canvas" 
				width={this.state.canvasSize.width} 
				height={this.state.canvasSize.height} 				
				onClick = {this.handleCanvasClick}
			>
			</canvas>

			<div className="select-group">
				<Select options={this.state.sizes} default={this.state.sizes[0]} select={this.selectSize}/>
				<Select options={this.state.speeds} default={this.state.speeds[2]} select={this.selectSpeed}/>	
				<Select options={this.state.patterns} default={this.state.activePattern} 
				select={this.selectPattern} value={this.state.activePattern}/>				
			</div>			 			
			<div>
				<h3 className="text-center">the Rules</h3>
				<ol className="list-group">
					<li>Any live cell with fewer than two live neighbours dies, as if caused by under-population.</li>
					<li>Any live cell with two or three live neighbours lives on to the next generation.</li>
					<li>Any live cell with more than three live neighbours dies, as if by over-population.</li>
					<li>Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.</li>
				</ol>				
				<p className="text-center"><a href="" target="_blank">Interview with John Conway</a></p>								
			</div>
	      </div>
	    );
  	}
});


export default App;
