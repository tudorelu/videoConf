import { Component } from '@angular/core';
import * as io from 'socket.io-client';
import * as RTCMultiConnection from 'rtcmulticonnection';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})

export class Tab3Page {

	connection: any = new RTCMultiConnection();

	name: string = "Guest User";
	remoteName: string = "";

	callerId: string = "";
	remoteCallerId: string = "";
	
	participants: any = [];
	predefinedRoomId: string = "DEFAULT_ROOM_ID";

	ionViewDidEnter() {

	    let connection = this.connection;
	 	let participants = this.participants;

	 	// set name
	 	this.name = "Guest User " + (participants.length+1)
	 	
	 	// set room id
		this.predefinedRoomId = Math.round((Math.random() * 100)) +"_MEDCONNET"

		// add participant to list
        participants.push({
    		name: this.name, 
    		roomId: this.predefinedRoomId
    	});

	    connection.socketURL = 'https://rtcmulticonnection.herokuapp.com:443/';
	    connection.session = {
	        audio: true,
	        video: true
	    };

	 	let videoContainer = document.getElementById('videos-container');
	 	connection.videosContainer = videoContainer;

		connection.onNewParticipant = function(participantId, userPreferences) {
		    var message = 'Guest User '+ (participants.length+1) + ' ('+ participantId + ') is trying to join your room. Confirm to accept his request.';
		    if( window.confirm(message) ) {
		        connection.acceptParticipationRequest(participantId, userPreferences);
		    }
		};
  	}

	updateVideosStyling(){

		console.log("Videos are : ")
		var children = this.connection.videosContainer.childNodes;
		if (children.length > 2){
			this.connection.videosContainer.style.
	 		children.forEach(function(item){
			    console.log(item.id);
			    item.style.flex = "2";
			});

	 		var local_stream = children[children.length - 1];
	 		local_stream.style.flex = "1";
	 	}
	}

	makeCall(){
		console.log("Me "+this.name+", calling "+this.remoteName+", id "+this.remoteCallerId);
	}

    openOrJoinYourRoom(){
        console.log("Open Room Clicked");
        this.connection.openOrJoin( this.predefinedRoomId );
    }
    
    openOrJoinOtherRoom(){
        console.log("Open Room Clicked");
        this.connection.openOrJoin( this.remoteName );
    }

}
