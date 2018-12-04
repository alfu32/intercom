var intercom=null;

function Intercom(params){
	console.log("create Intercom instance");
	var channels={}
	var subscribers={}

		__worker();

	this.subscribe=function (channel,handler){
		if(!subscribers[channel])subscribers[channel]=[];
		subscribers[channel].push(handler);
	}
	this.unsubscribe=function (channel,handler){
		if(!subscribers[channel])subscribers[channel]=[];
		subscribers[channel]=subscribers[channel].filter(function(h){return h==handler;})
	}
	this.publish=function (channel,data){
		if(!channels[channel] )channels[channel]=[];
		channels[channel].push(data);
	}
	this.channels=function(){
		return channels;
	}
	this.subscribers=function(){
		return subscribers;
	}
	function __worker(){
		Object.keys(channels).forEach(function(chn){
			channels[chn]=channels[chn].filter(function(data){
				(subscribers[chn]||[]).forEach(function(handler){
					handler(chn,data,handler);
				})
				return false;
			})
		})
		this.timeout = setTimeout(__worker.bind(this),40);
	}
}
Intercom.getInstance=function(){ 
	if(intercom === null ) intercom = new Intercom();
	return intercom;
}


module.exports={
	intercom:intercom,
	Intercom:Intercom
}