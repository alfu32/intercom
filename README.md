install :
`npm install intercom`


usage :

subscriber :

```javascript
function someFunction(channelNameString,dataObject){
	...
}

intercom.subscribe("some.channel.name",someFunction);
```

publisher :

```javascript
	intercom.publish("some.chanel.name",someData)
```


When invoking intercom publish Intercom will dispatch the `someData` object through a call to all the channel subscribers.

the call is done out of sync (@ 1ms intervals)