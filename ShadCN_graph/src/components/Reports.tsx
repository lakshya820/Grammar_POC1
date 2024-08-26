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
import '../css/Reports.css';

const Reports: React.FC = () => {
  return (
    <div className="reports">
        <MainLayout>
            <div className="reports_content">
                <div className="reports_header">
                    <p>Reports</p>
                </div>

                <div className="reports-table">
                    <table>
                            <thead>
                                <tr>
                                <th>SI#</th>
                                <th>Test Name</th>
                                <th># Questions</th>
                                <th># Learners</th>
                                <th>Test Date</th>
                                <th>Duration</th>
                                <th>Status</th>
                                <th>Author</th>
                                <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                <td>1</td>
                                <td>Empathy</td>
                                <td>15</td>
                                <td>5</td>
                                <td>15/12/2022</td>
                                <td>15 mins</td>
                                <td>Live</td>
                                <td>John Doe</td>
                                <td>
                                    <button>Download Report</button>
                                </td>
                                </tr>
                                <tr>
                                <td>2</td>
                                <td>Comprehension</td>
                                <td>15</td>
                                <td>5</td>
                                <td>13/11/2022</td>
                                <td>10 mins</td>
                                <td>Completed</td>
                                <td>John Doe</td>
                                <td>
                                    <button>Download Report</button>
                                </td>
                                </tr>
                                <tr>
                                <td>3</td>
                                <td>Paraphrasing</td>
                                <td>15</td>
                                <td>5</td>
                                <td>10/10/2022</td>
                                <td>30 mins</td>
                                <td>Completed</td>
                                <td>John Doe</td>
                                <td>
                                    <button>Download Report</button>
                                </td>
                                </tr>
                            </tbody>
                    </table>
                </div>
            </div>
        </MainLayout>
    </div>
  )
}

export default Reports;