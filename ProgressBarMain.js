(function() { 
	let template = document.createElement("template");
	template.innerHTML = `
		<style>
		:host {
			border-radius: 10px;
			border-width: 2px;
			border-color: black;
			border-style: solid;
			display: block;
		} 

		body {
		  background: #fff;
		}
		
		.metric {
		  padding: 10%;
		}
		
		.metric svg {
		  max-width: 100%;
		}
		
		.metric path {
		  stroke-width: 75;
		  stroke: #ecf0f1;
		  fill: none;
		}
		
		.metric text {
		  font-family: "Lato", "Helvetica Neue", Helvetica, Arial, sans-serif;
		}
		
		.metric.participation path.data-progress {
		  stroke: #27ae60;
		}
		
		.metric.participation text {
		  fill: #27ae60;
		}		
		</style>
		
		<div class="container">
		  <div class="row">
		    <div class="col-md-4 col-sm-4">
		      <div class="metric participation" data-ratio=".95">
		        <svg viewBox="0 0 1000 500">
			        <path d="M 50 500 L950 500"></path>
					<text class='percentage' text-anchor="middle" alignment-baseline="middle" x="500" y="200" font-size="140" font-weight="bold">0%</text>
					<text class='title' text-anchor="middle" alignment-baseline="middle" x="500" y="350" font-size="90" font-weight="normal"></text>
					<text class='title' text-anchor="middle" alignment-baseline="middle" x="25" y="485" font-size="20" font-weight="normal">0</text>
					<text class='title' text-anchor="middle" alignment-baseline="middle" x="975" y="485" font-size="20" font-weight="normal">100</text>

  	            </svg>
		      </div>
		    </div>
		  </div>
		</div>
	`;

	class Box extends HTMLElement {
		constructor() {
			super(); 
			let shadowRoot = this.attachShadow({mode: "open"});
			shadowRoot.appendChild(template.content.cloneNode(true));
			
			this.$style = shadowRoot.querySelector('style');			
			this.$svg = shadowRoot.querySelector('svg');
			
			this.addEventListener("click", event => {
				var event = new Event("onClick");
				this.dispatchEvent(event);
			});
			
			this._props = {};
		}
		
		render(val,valll ,valul, info, color) {
			var val1 = val ;
			var valll1 = valll;
			var valul1 = valul;
			var x = this.progress(val1,valll1,valul1);
			var rounded = Math.round( val * 10 ) / 10;
			var percentage = (val1/(valul1-valll1));

			
			if(rounded >=0 && rounded <=100) {
				this.$style.innerHTML = ':host {border-radius: 10px;border-width: 2px;border-color: white;border-style: solid;display: block;}.body {background: #fff;}.metric {padding: 10%;}.metric svg {max-width: 100%;}.metric path {stroke-width: 75;stroke: #ecf0f1;fill: none;}.metric text {font-family: "Lato", "Helvetica Neue", Helvetica, Arial, sans-serif;}.metric.participation path.data-progress {stroke: ' + color + ';}.metric.participation text {fill: ' + color + ';}';
				this.$svg.innerHTML = '<path d="M 50 500 L950 500"></path><text class="percentage" text-anchor="middle" alignment-baseline="middle" x="500" y="200" font-size="140" font-weight="bold">' + rounded +'( '+percentage + '% )</text><text class="title" text-anchor="middle" alignment-baseline="middle" x="500" y="350" font-size="90" font-weight="normal">' + info + '</text><path d="' + x + '" class="data-progress"></path><text class="title" text-anchor="middle" alignment-baseline="middle" x="25" y="485" font-size="20" font-weight="normal">' + valll1 + '</text><text class="title" text-anchor="middle" alignment-baseline="middle" x="975" y="485" font-size="20" font-weight="normal">' + valul1 + '</text>"';
			}
		}

		  
		progress(x,ll,ul){
			var end_x;
			end_x=(900*(x/(ul-ll)))+50;
			return "M 50 500 L"+ end_x+" 500";
		};

		onCustomWidgetBeforeUpdate(changedProperties) {
			this._props = { ...this._props, ...changedProperties };
		}

		onCustomWidgetAfterUpdate(changedProperties) {
			if ("value" in changedProperties) {
				this.$value = changedProperties["value"];
			}
			
			if ("LowerLimitvalue" in changedProperties) {
				this.$LowerLimitvalue = changedProperties["LowerLimitvalue"];
			}
			
			if ("UpperLimitvalue" in changedProperties) {
				this.$UpperLimitvalue = changedProperties["UpperLimitvalue"];
			}
			
			if ("info" in changedProperties) {
				this.$info = changedProperties["info"];
			}
			
			if ("color" in changedProperties) {
				this.$color = changedProperties["color"];
			}
			
			this.render(this.$value,this.$LowerLimitvalue,this.$UpperLimitvalue, this.$info, this.$color);
		}
	}
	
	customElements.define("com-demo-gauge", Box);
})();
