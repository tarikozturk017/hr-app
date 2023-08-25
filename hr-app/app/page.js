/*
This task is focused on the workplace accommodation process. 
Please take the time to review and complete this task in a fulsome way to ensure the hiring 
committee can recognize your skills and abilities. We ask that you code a working application from the requirements below. Once complete, please record a walkthrough of the screens with a voiceover explaining your logic to a business and technical audience.

The Task:
Create a Submission Form where employees can include information in the following fields:
- Identification information (name, ID, department, employment status, email)
Accommodation requests
- File upload (for documentation)
- Store the Submission Form information in a database
- Create a lookup form to allow Human Resources to review and filter by the Submission Form fields

*/

"use client";
import { useState } from "react";
import FormPage from "./formPage";
import Navbar from "./Navbar";
import Lookup from "@/app/lookup";
export default function Home() {
  const [isFormPage, setIsFormPage] = useState(true);

  return (
    <main>
      <Navbar setIsFormPage={setIsFormPage} />
      <div className=" flex">
        <div className=" mt-8 w-2/4 mx-auto">
          {isFormPage ? <FormPage /> : <Lookup />}
        </div>
      </div>
    </main>
  );
}
