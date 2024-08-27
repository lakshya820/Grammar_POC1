import { default as React, useState } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "../components/ui/card"

import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select"
import {Search} from "lucide-react"
import MainLayout from "./MainLayout";
import '../css/Learners2.css';

const Learners2: React.FC = () => {
  return (
    <div className="learners1">
        
            <div className="learners1_content">
                <div className="learners1_header">
                    <p>Learners</p>
                </div>
                
                <div className="Card">
                    <Card className="w-[800px]">
                        <CardContent>
                            <form>
                            <div className="grid w-full items-center gap-4">
                                
                                <Label>First Name</Label>
                                <Input id="first_name" placeholder="First Name" />
                                <Label>Last Name</Label>
                                <Input id="last_name" placeholder="Last Name" />
                                <Label>Email id</Label>
                                <Input id="first_name" placeholder="Email id" />
                                <Label>Account</Label>
                                <Input id="first_name" placeholder="Account" />
                            </div>
                            </form>
                        </CardContent>
                        <CardFooter className="flex justify-between">
                            <Button variant="outline">Cancel</Button>
                            <Button>Create</Button>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        
    </div>
  )
}

export default Learners2;