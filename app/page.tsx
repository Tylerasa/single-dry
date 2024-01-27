"use client";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
  CardFooter,
} from "@/components/ui/card";
import { FormEvent, SVGProps, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import ThemeToggle from "@/components/ui/theme-toggler";
import { driver } from "driver.js";
import "driver.js/dist/driver.css";


export default function Home() {
  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const dobRef = useRef<HTMLInputElement>(null);

  const [citiesInfo, setCitiesInfo] = useState<ICityInfo[]>([
    {
      id: 0,
      name: "",
      date: "",
    },
  ]);

  const submit = (e: FormEvent) => {
    e.preventDefault();

    if (firstNameRef.current && lastNameRef.current && dobRef.current) {
      //json to be sent to the backend
      let jsonOutput = {
        firstName: firstNameRef.current.value,
        lastName: lastNameRef.current.value,
        dob: dobRef.current.value,
        cities: getValues(),
      };
      toast(
        <div>
          <h2 className="font-semibold mt-3 mb-[2px]">Personal Information</h2>
          <p>
            <b>First Name: </b> <span>{firstNameRef.current.value}</span>
          </p>
          <p>
            {" "}
            <b>Last Name: </b> <span>{lastNameRef.current.value}</span>
          </p>
          <p>
            <b>Dob: </b> <span>{dobRef.current.value}</span>
          </p>
          <h2 className="font-semibold mt-3 mb-[2px]">Cities Travelled</h2>

          {renderCities()}
        </div>
      );
    }
  };

  const addMore = () => {
    setCitiesInfo((prev) => {
      const nextId = prev.length > 0 ? prev[prev.length - 1].id + 1 : 0;

      return [
        ...prev,
        {
          id: nextId,
          date: "",
          name: "",
        },
      ];
    });
  };

  const getValues = (): ICityInfo[] => {
    const values: ICityInfo[] = [];
    citiesInfo.forEach((city, i) => {
      values.push({
        id: city.id,
        name:
          (document.getElementById(`city-${i}`) as HTMLInputElement)?.value ||
          "",
        date:
          (document.getElementById(`date-${i}`) as HTMLInputElement)?.value ||
          "",
      });
    });
    return values;
  };

  const renderCities = () => (
    <div className="">
      {getValues().map((city, i) => (
        <p>
          <b>{city.name} </b>
          <b>@</b> {city.date}
        </p>
      ))}
    </div>
  );

  const deleteCity = (id: number | undefined) => {
    console.log("id", id);

    if (id) {
      setCitiesInfo((prev) => prev.filter((input) => input.id !== id));
    }
  };


  useEffect(() => {
    const driverObj = driver({
      showProgress: true,
      steps: [
        {
          element: ".app-form",
          popover: {
            title: "Edit Your Form Here",
            description: "Fill the input and submit your data.",
          },
        },
        {
          element: ".add-more",
          popover: {
            title: "Add More",
            description: "Click here to add more city-date fields.",
          },
        },
        {
          element: ".delete",
          popover: {
            title: "Delete City Info",
            description: "Click here to delete city info.",
          },
        },
        {
          element: ".toggle",
          popover: {
            title: "Theme Toggle",
            description: "Toggle between light and dark here.",
          },
        },
      ],
    });

    driverObj.drive();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-card py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-2xl">
        <form className="app-form" onSubmit={submit}>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>Enter your personal details.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="first-name">First Name</Label>
              <Input
                ref={firstNameRef}
                id="first-name"
                placeholder="Enter your first name"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="last-name">Last Name</Label>
              <Input
                ref={lastNameRef}
                id="last-name"
                placeholder="Enter your last name"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dob">Date of Birth</Label>
              <Input ref={dobRef} id="dob" required type="date" />
            </div>
          </CardContent>
          {/* </Card> */}
          {/* <Card className="w-full max-w-2xl mt-8"> */}
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Cities Travelled</CardTitle>

              <Button className="add-more" type="button" onClick={addMore}>
                {" "}
                Add More
              </Button>
            </div>
            <CardDescription>
              Enter the cities you have travelled to.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {citiesInfo.map((city, i) => (
              <div key={city.id} className="space-y-2">
                <div className="space-y-2">
                  <Label className="flex justify-between" htmlFor={`city-${i}`}>
                    <span>City {i + 1}</span>
                    <span
                      onClick={() => deleteCity(city.id)}
                      className="pr-3 cursor-pointer delete"
                    >
                      <Minus className="fill-red-600 w-4 h-4" />
                    </span>
                  </Label>
                  <Input id={`city-${i}`} placeholder="Enter city name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`date-${i}`}>Date Arrived</Label>
                  <Input id={`date-${i}`} type="date" />
                </div>
              </div>
            ))}
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full">
              Submit
            </Button>
          </CardFooter>
        </form>
      </Card>
      <ThemeToggle/>
    </div>
  );
}

const Minus = (props: SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    height="512px"
    version="1.1"
    viewBox="0 0 512 512"
    width="512px"
  >
    <g>
      <path d="M256,32C132.3,32,32,132.3,32,256s100.3,224,224,224s224-100.3,224-224S379.7,32,256,32z M384,272H128v-32h256V272z" />
    </g>
  </svg>
);
