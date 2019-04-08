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
	
	participants: any = [{name:"Jamaica"}, {name:"Hameia"}, {name:"Geroma"}];
	predefinedRoomId: string = "1234xxxQ";
	
	ionViewDidEnter() {
	    var connection = this.connection;
	    connection.socketURL = 'https://rtcmulticonnection.herokuapp.com:443/';
	    connection.session = {
	        audio: true,
	        video: true
	    };

	 	let videoContainer = document.getElementById('videos-container');
	 	connection.videosContainer = videoContainer;
		connection.onNewParticipant = function(participantId, userPreferences) {
		    var message = participantId + ' is trying to join your room. Confirm to accept his request.';
		    if( window.confirm(message) ) {
		        connection.acceptParticipationRequest(participantId, userPreferences);
		        this.participants.push({name:participantId});
		    }
		};
  	}

	updateVideosStyling(){

		console.log("Videos are : ")
		var children = this.connection.videosContainer.childNodes;
 		children.forEach(function(item){
		    console.log(item.id);
		    item.style.width = "90vw";
		    item.style.height = "60vh";
		});

 		var local_stream = children[children.length - 1];
 		local_stream.style.width = "40vw";
		local_stream.style.height = "30vh";
	}

	makeCall(){
		console.log("Me, "+this.name+" Calling "+this.remoteName+", id: "+this.remoteCallerId);
	}

    openOrJoinRoom(){
        console.log("Open Room Clicked");
        this.connection.openOrJoin( this.predefinedRoomId );
    }

}
