import { default as React } from "react";
import '../css/Tests1.css';
import { useNavigate } from 'react-router-dom';

  


const Tests1: React.FC = () => {

    const navigate = useNavigate();

    const handleNavigateToTests2 = () => {
        navigate('/main/tests2');
      };


  return (
    <div className="tests1">
                <div className="tests1_header">
                    <h1>Tests</h1>
                </div>
                <div className="tests1_card">
                    <div className="card_header">
                    <p>Empathy</p>
                    </div>
                    <div className="card_label1">
                            <p>This test is focused to teach learners how to empathize with users, when they are upset because of the issue they are facing.</p>
                    </div>
                    <div className="card_label2">
                            <p> Date: 08/12/2022        Time: 12:00         Duration: 15 mins</p>
                    </div>
                    <div className="card_buttons">
                            <button className="card_button_start" onClick={handleNavigateToTests2}>Start Test</button>
                            <button className="card_button_cancel">Cancel</button>
                    </div>
                </div>
    </div>
  )
}

export default Tests1;