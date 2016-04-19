
	var EventUtil = {
		addHandler: function(element, type, handler){

			if(element.addEventListener){
				element.addEventListener(type, handler, false);
			}else if(element.attachEvent){
				element.attachEvent("on" + type,handler);
			}else{
				element["on" + type] = handler;
			}

		},

		removeHandler: function(element, type, handler){

			if(element.removeEventListener){
				element.removeEventListener(type, handler, false);
			}else if(element.detachEvent){
				element.detachEvent("on" + type, handler);
			}else{
				element["on" + type] = null;
			}

		},

		getEvent: function(event){

			return event?event : window.event;

		},

		stopEventBubble: function(event){

			if(event.stopPropagation){
				event.stopPropagation();
			}else{
				event.cancelBubble = true;
			}
		},

		getEventTarget: function(event){

			if(event.target){
				return event.target;
			}else{
				return event.srcElement;
			}
		}
	};


