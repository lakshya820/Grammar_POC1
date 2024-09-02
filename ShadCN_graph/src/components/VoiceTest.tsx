import { default as React, useEffect, useState, useRef } from "react";
import {CardContent,CardFooter} from "./ui/card";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import * as io from "socket.io-client";
import getLexResponse from '../lib/lex-bot';
import ExamLayout from "./ExamLayout";
import { useNavigate } from 'react-router-dom';
import '../css/VoiceTest.css';

var request_content_type = import.meta.env.VITE_APP_REQUEST_CONTENT_TYPE;
var input_stream = import.meta.env.VITE_APP_INITIAL_INPUT;

const sampleRate = 16000;
var isFirstLexCall = true;

const getMediaStream = () =>
  navigator.mediaDevices.getUserMedia({
    audio: {
      deviceId: "default",
      sampleRate: sampleRate,
      sampleSize: 16,
      channelCount: 1,
    },
    video: false,
  });

interface WordRecognized {
  isFinal: boolean;
  text: string;
}

const VoiceTest: React.FC = () => {
  //console.log("Initiating...............");
  const [connection, setConnection] = useState<io.Socket>();
  //const [currentRecognition, setCurrentRecognition] = useState<string>();
  const [recognitionHistory, setRecognitionHistory] = useState<string[]>([]);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [recorder, setRecorder] = useState<any>();
  const [textAreaValue, setTextAreaValue] = useState("");
  const [lastSentence, setLastSentence] = useState("");
  const processorRef = useRef<any>();
  const audioContextRef = useRef<any>();
  const audioInputRef = useRef<any>();
  const navigate = useNavigate();

  //function to make a call to lex-bot.js
  function callLexBot(input_text: any){
    //disconnect();
    getLexResponse(input_text, request_content_type)
  }

  //Initial call to lex-bot.js when the page loads.
  if(isFirstLexCall){
    console.log("Fist call to lex.");
    callLexBot(input_stream);
    isFirstLexCall=false;
  }

  const speechRecognized = (data: WordRecognized) => {
    if (data.isFinal) {
      setRecognitionHistory((old) => [data.text, ...old]);
     } 
    //else {
    //   console.log("speech recognized else");
    //   setCurrentRecognition(data.text + "...continue listning");
    // }
  };

  useEffect(() => {
    if(recognitionHistory.length !== 0 && recognitionHistory[0] !== ""){  
      //console.log("\n\nrecognitionHistory whole array: ", recognitionHistory);
      //console.log("checking data to sent to lex after timeout.");

      var final_uttrence = " ";
      //console.log("final_uttrence: "+final_uttrence);

      for(var i=recognitionHistory.length; i>=0; i--){

        if(recognitionHistory[i] !== "" &&recognitionHistory[i] !== undefined){
          //console.log("Item state: "+recognitionHistory[i]);
          final_uttrence+=recognitionHistory[i]+" ";
        }            
      }

      setRecognitionHistory(()=>[]);
      console.log("The final uttrence of the user sending to lex: "+final_uttrence);
      final_uttrence=final_uttrence.charAt(1).toUpperCase() + final_uttrence.slice(2);
      setLastSentence(final_uttrence);
      setTextAreaValue(textAreaValue+final_uttrence);
      //callLexBot(final_uttrence);
      console.log("last sentence: "+lastSentence);
    }

  }, [recognitionHistory]);

  const connect = () => {
    console.log("connect:");
    connection?.disconnect();
    const socket = io.connect("http://localhost:8081");
    socket.on("connect", () => {
      setConnection(socket);
    });

    socket.emit("send_message", "hello world");

    socket.emit("startGoogleCloudStream");

    // socket.on("receive_message", (data) => {
    //   console.log("received message from server: ", data);
    // });

    //Printing the each uttrence from the server.
    socket.on("receive_audio_text", (data) => {
      //console.log("received audio text", data);
      speechRecognized(data);
    });

    socket.on("disconnect", () => {
      //console.log("disconnected", socket.id);
    });
  };

  const disconnect = () => {
    if (!connection) return;
    connection?.emit("endGoogleCloudStream");
    connection?.disconnect();
    processorRef.current?.disconnect();
    audioInputRef.current?.disconnect();
    audioContextRef.current?.close();
    setConnection(undefined);
    setRecorder(undefined);
    setIsRecording(false);
  };

  useEffect(() => {    
    console.log("Main useEffect");
    (async () => {
      if (connection) {
        try{
          if (isRecording) {
            return;
          }
          console.log("conneected.");
          const stream = await getMediaStream();

          audioContextRef.current = new window.AudioContext();
          console.log("conneected 0.1");

          await audioContextRef.current.audioWorklet.addModule("/src/worklets/recorderWorkletProcessor.js");        
          console.log("conneected 0.2");

          audioContextRef.current.resume();
          
          console.log("conneected 1.");
          audioInputRef.current = audioContextRef.current.createMediaStreamSource(stream);

          processorRef.current = new AudioWorkletNode(audioContextRef.current,"recorder.worklet");
          console.log(`audio contect ref current`, new AudioWorkletNode(audioContextRef.current,"recorder.worklet"));

          processorRef.current.connect(audioContextRef.current.destination);
          audioContextRef.current.resume();
          console.log("process added to connect");
          console.log("conneected 2.");

          audioInputRef.current.connect(processorRef.current);
          console.log("audio added to connect.");

          processorRef.current.port.onmessage = (event: any) => {
            const audioData = event.data;
            console.log(`Audio data: `, audioData.audio);
            connection.emit("send_audio_data", { audio: audioData });
          };
          console.log("conneected 3.");

          // //Initial call to lex-bot.js when the page loads.
          // if(isFirstLexCall){
          //   console.log("Fist call to lex.");
          //   callLexBot(input_stream);
          //   isFirstLexCall=false;
          // }

          setIsRecording(true);
        }catch(error){
          console.log("The error is: "+error);
        }
      } else {
        console.error("No connection");
      }
    })();
    return () => {
      if (isRecording) {
        console.log("isRecording useEffect return");
        processorRef.current?.disconnect();
        audioInputRef.current?.disconnect();
        if (audioContextRef.current?.state !== "closed") {
          audioContextRef.current?.close();
        }
      }
    };
  }, [connection, isRecording, recorder]);

  const resetComponent = (()=>{
    setTextAreaValue("");
  });

  const handleButtonSubmit = (()=>{
    //if(window.confirm("Do you want to continue with you answer.\nClick 'Ok' to continue else 'Cancel' to answer again.")){
      callLexBot(textAreaValue);
      resetComponent();
    //}else{
    //    resetComponent();
    //}
  });

  const handleButtonRemoveLast = (()=>{
    console.log("last sentence: "+lastSentence);
    console.log(textAreaValue);
    setTextAreaValue(textAreaValue.replace(lastSentence, ""));
  });

  const handleButtonClear = (()=>{
    setTextAreaValue("");
  });

  const handleShowingGrammar= () => {
    navigate('/grammar');
  };

  return (
    <ExamLayout>
      <div hidden>
        {/* <Button
          id = "start_conv" 
          onClick={connect}
          disabled={isRecording}
        >
        Start Conversation
        </Button> */}
        <Button
          id = "end_rec" 
          onClick={disconnect}
          disabled={!isRecording}></Button>
          <Button
                id = "grammar_redirect" 
                onClick={handleShowingGrammar}
                >Grammar</Button>
      </div>
      <CardContent>
        <div className="grid w-full items-center gap-4">
          <div className="flex flex-col space-y-1.5">
          {/* <Label htmlFor="name">#Question 1</Label> */}
          <span hidden><audio id="audio" controls src="./assets/blank.mp3"></audio></span>
          <Label htmlFor="marker"><span className="question_span" id="ques-disp">Loading question...</span></Label>
          {/* <Input id="name" placeholder="Answer Transcript..."/> */}
          <div>
            <span>
              <textarea className="voicetest_textarea" rows={10} cols={50} value={textAreaValue}>
                {textAreaValue}
                </textarea>
              </span>
              </div>

              <div className="exam_note">
                <i><p>Important Instructions:&nbsp;Please take 30-40 seconds to frame your answer and then try answering in one go without any unnecessary pauses. </p>
                <p>Press the 'Enable Mic' button to start recoding your answer. After finishing your answer press on submit.</p>
                </i>
              </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <button className="mic_button" id="start_rec" type="button" onClick={connect} disabled={isRecording}>Enable Mic</button>
        <button className="clear_button" onClick={handleButtonClear}>Clear</button>
        <button className="remove_button"onClick={handleButtonRemoveLast}>Remove last sentence</button>
        <button className="submit_button"onClick={handleButtonSubmit}>Submit</button>
      </CardFooter>
    </ExamLayout>
  )
}

export default VoiceTest;