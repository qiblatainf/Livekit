import "./styles.css";

//importing the livekit client
import { connect, createLocalTracks, RoomEvent } from "livekit-client";

document.getElementById("connect").addEventListener("click", (e) => {
  join();
});

async function join() {
  const t = document.getElementById("jwt").value;
  console.log(t);

  // const url = "wss://linuxconnectiontest-15hwbf7p.livekit.cloud";
  const url = "wss://sadiqapptest-cb3rt2an.livekit.cloud";

  const room = await connect(url, t);

  room.on(RoomEvent.TrackSubscribed, (track, publication, participant) => {
    console.log("Participant Subscribed");
    attachTrack(track, participant);
  });

  const tracks = await createLocalTracks({
    audio: true,
    video: true
  });
  for (let track of tracks) {
    await room.localParticipant.publishTrack(track);

    console.log("Publishing Track");
    console.log(track);
    if (track.kind === "video") {
      const v = document.getElementById("us");
      track.attach(v);
    }
  }
}

function attachTrack(track, participant) {
  const v = document.getElementById("them");
  track.attach(v);
}
