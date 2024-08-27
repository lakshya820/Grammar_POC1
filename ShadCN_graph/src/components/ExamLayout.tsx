// Header.tsx
import React from 'react';
import '../css/Header.css';
import '../css/NavBar.css';
import '../css/QuestionMain.css'
import {Card,CardDescription,CardHeader,CardTitle} from "./ui/card";
import Timer from "../lib/test-timer";
import Header from './Header';

interface MainLayoutProps{
  children: React.ReactNode; // To render other components inside MainLayout
}

const ExamLayout: React.FC<MainLayoutProps> = ({children}) => {
  let disable_timer=false;
  let disable_visiblity = false;
  sessionStorage.setItem('first_exam_warning', "false");

  function stop_exam(status:any){
    document.getElementById('tst_pnl')?.remove();
    if(status=="timer"){
      disable_visiblity=true;
      document.getElementById('exam-pnl')!.innerHTML = `<div style='background-color: #F4F5F8; height: 100rem; width: 100rem; border-radius: 5px; text-align: center; padding-top: 15px;'>
                                                          <div style='text-align: inherit; font-weight: 600; font-size: 24px; padding-top: 100px;'>
                                                            <span>Your time is up.</span>
                                                          </div>
                                                          <div style='padding-top:inherit;'>
                                                            <span>Your score is `+show_score()+`</span>
                                                          </div>
                                                          <div style='padding-top:inherit;'>
                                                            <span><button onClick="(function(){document.exitFullscreen();})();return false;" style='width: 10rem; border-radius: 7px; height: 2.2rem; border: none; background-color: #5F249F; color: #ffff; margin-right:5px;'>close</button></span>
                                                          </div>
                                                        </div>`;

    }else{
      disable_timer=true;
      document.getElementById('exam-pnl')!.innerHTML =  `<div style='background-color: #F4F5F8; height: 100rem; width: 100rem; border-radius: 5px; text-align: center; padding-top: 15px;'>
                                                          <div style='text-align: inherit; font-weight: 600; font-size: 24px; padding-top: 100px;'>
                                                            <span>You have exited from the full screen. The exam is submited.</span>
                                                          </div>
                                                          <div style='padding-top:inherit;'>
                                                            <span>Your score is `+show_score()+`</span>
                                                          </div>
                                                          <div style='padding-top:inherit;'>
                                                            <span><button onClick="(function(){document.exitFullscreen();})();return false;" style='width: 10rem; border-radius: 7px; height: 2.2rem; border: none; background-color: #5F249F; color: #ffff; margin-right:5px;'>close</button></span>
                                                          </div>
                                                        </div>`;
    }
    

  }

  const handleOnTimerStops = () => {
    if(!disable_timer){      
      stop_exam("timer");
    }
  };

  window.onload=()=>{
    console.log("windows loaded.")
    document.getElementById('overlay')!.style.display="block"; 
  }

  document.onvisibilitychange=()=>{
    console.log('visiblity state: ', document.visibilityState);
    if(!disable_visiblity){
      if (document.visibilityState === 'hidden'){
        sessionStorage.setItem('first_exam_warning', "true");
        stop_exam("intruption");
      }
    }
  };

  document.addEventListener('fullscreenchange', () => {
    if(!disable_visiblity){
      if (!document.fullscreenElement) {
        sessionStorage.setItem('first_exam_warning', "true");
        stop_exam("intruption");
      }
    }
  });

  const handleStartExam=()=>{
    document.documentElement.requestFullscreen();
    document.getElementById('overlay')!.style.display="none";
    document.getElementById('start_timer')?.click();
    document.getElementById('start_timer')?.remove();
    document.getElementById('audio')?.play();
  }

  function show_score(){
    return "80%";
  }

  return (
    <div>
      <div className='overlay' id='overlay'>
        <div className='overlay-content'>
          <div className='overlay-elem'><span>For the exam you have to go to a full screen mode. In between exam if you exit from full screen mode then the exam will be terminated. Click on the ok to start the exam.</span></div>
          <div className='overlay-elem'><button className='button' onClick={handleStartExam}>Ok</button></div>
        </div>            
      </div>
      <div className='exam-pnl' id="exam-pnl"></div>  
      <Header />
      <div className="tests2" id='tst_pnl'>          
        <div className="tests2_content">   
            <div className="Card">
              <Card className="w-[1080px] ">
              <CardHeader>
                <div className='exam-timer'><span id='timer'><Timer onTimerStops={handleOnTimerStops}/></span></div>           
                <CardTitle>Empathy</CardTitle>
                <CardDescription>This test is focused to teach learners how to empathize with users, when they are upset because of the issue they are facing.</CardDescription>
              </CardHeader>
              {/* <audio id="audio" autoPlay></audio> */}
              {children}
              </Card>
            </div>
        </div>
      </div>
    </div>    
  );
};
export default ExamLayout