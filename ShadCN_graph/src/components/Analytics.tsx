
import { default as React, useState } from "react";
import MainLayout from "./MainLayout";
import '../css/Analytics.css';
import BarChart1 from '../Pages/BarChart1'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "../components/ui/card"

  import BarChart2 from "../Pages/BarChart2";

const Analytics: React.FC = () => {
    

    return (
        <React.Fragment>
            <div className="analytics">
                <MainLayout>
                    <div className="analytics_header">
                        <h5>Analytics</h5>
                        <h4>Analytics-Andrew Jhonston</h4>
                        <h3>Andrew Jhonston</h3>
                        <h2>What is Lorem Ipsum Lorem Ipsum is simply dummy text of the printing and typesetting industry Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s when an unknown printer took a galley of type and scrambled it to make a type specimen book it has?</h2>
                        <div className="analytics_center">
                        <div className="overall_rating_card">
                            <Card>
                                <CardHeader>Overall Rating</CardHeader>
                            </Card>
                        </div>
                        <div className="analytics_chart1">
                            <BarChart1></BarChart1>
                        </div>
                        <div className="analytics_chart2">
                            <BarChart2></BarChart2>
                        </div>
                        </div>
                    </div>
                </MainLayout>
          </div>
        </React.Fragment>
    );
}

export default Analytics;