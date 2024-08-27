import { default as React, useState } from "react";
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import MainLayout from "./MainLayout";
import '../css/Tests1.css';
import { useNavigate } from 'react-router-dom';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "./ui/card";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "./ui/select";
  


const Tests1: React.FC = () => {

    const navigate = useNavigate();

    const handleNavigateToTests2 = () => {
        navigate('/main/tests2');
      };


  return (
    <div className="tests1">
        
            <div className="tests1_content">
                <div className="tests1_header">
                    <p>Tests</p>
                </div>
                <div className="Card">
                    <Card className="w-[800px]">
                    <CardHeader>
                        <CardTitle>Empathy</CardTitle>
                        <CardDescription>This test is focused to teach learners how to empathize with users, when they are upset because of the issue they are facing.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form>
                        <div className="grid w-full items-center gap-4">
                            <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="name">Date</Label>
                            
                            </div>
                            <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="framework">Duration</Label>
                            
                            </div>
                        </div>
                        </form>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                        <Button variant="outline" onClick={handleNavigateToTests2}>Start Test</Button>
                        <Button>Cancel</Button>
                    </CardFooter>
                    </Card>
                </div>
            </div>
        
    </div>
  )
}

export default Tests1;