import { Breadcrumbs, Button, Select, Table } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { Link } from "react-router-dom";
import { useState } from "react";
import LoadingLottie from "../../Global/Lottie/LoadingLottie";

export default function ReportDetailsVariantA(props: any) {
  const [date, setDate] = useState<any | undefined>();

  const items = [
    { title: "Reports", href: "/reports" },
    { title: "Report Details", href: "" },
  ].map((item, index) => (
    <Link to={item.href} key={index}>
      {item.title}
    </Link>
  ));

  return (
    <>
      <div className="px-6 pt-2 text-sm">
        <Breadcrumbs>{items}</Breadcrumbs>
      </div>
      <div className="p-6 flex justify-between ">
        <p className="text-lg font-bold">Reports</p>
        <div>
          <Button className="bg-[#202E61]">Export</Button>
        </div>
      </div>
      <div>
        {props?.loading ? (
          <div className="pt-20 flex justify-center items-center h-full w-full">
            <LoadingLottie />
          </div>
        ) : (
          <div className="lg:max-w-screen-lg px-6">
            <h1 className="font-bold text-sm">Report Details</h1>
            <div className="flex mt-4 w-full mb-8">
              <div className="w-[40%]">
                <h1 className="text-sm">Project name</h1>
              </div>
              <div className="w-[60%]">
                <h1 className="text-sm">Project 505</h1>
              </div>
            </div>
            <div className="flex justify-between mb-8">
              <div className="w-[40%]">
                <h1 className="text-sm">Device Model</h1>
              </div>
              <div className="w-[60%]">
                <h1 className="text-sm">Lorem ipsum</h1>
              </div>
            </div>
            <div className="flex justify-between mt-8">
              <div className="w-[40%]">
                <h1 className="text-sm">Project State</h1>
              </div>
              <div className="w-[60%]">
                <h1 className="text-sm">active</h1>
              </div>
            </div>
            <div className="flex justify-between mt-8">
              <div className="w-[40%]">
                <h1 className="text-sm">Project Stated</h1>
              </div>
              <div className="w-[60%]">
                <h1 className="text-sm">11/03/2023</h1>
              </div>
            </div>
            <div className="flex justify-between mt-8">
              <div className="w-[40%]">
                <h1 className="text-sm">Total Device Provision</h1>
              </div>
              <div className="w-[60%]"></div>
            </div>
            <div className="my-16">
              <Table
                verticalSpacing="xs"
                striped
                fontSize="sm"
                highlightOnHover
              >
                <thead>
                  <tr>
                    <th className="w-[16.6%]">
                      <Select
                        label="Device ID"
                        placeholder="Device ID"
                        searchable
                        nothingFound="No options"
                        className="w-full mr-4"
                        data={["React", "Angular", "Svelte", "Vue"]}
                      />
                    </th>
                    <th className="w-[16.6%]">
                      <Select
                        label="Device Model"
                        placeholder="Device Model"
                        searchable
                        nothingFound="No options"
                        className="w-full mr-4"
                        data={["React", "Angular", "Svelte", "Vue"]}
                      />
                    </th>
                    <th className="w-[16.6%]">
                      <Select
                        label="Value"
                        placeholder="Value"
                        searchable
                        nothingFound="No options"
                        className="w-full mr-4"
                        data={["React", "Angular", "Svelte", "Vue"]}
                      />
                    </th>
                    <th className="w-[16.6%]">
                      <DateInput
                        label="Date"
                        value={date}
                        onChange={setDate}
                        placeholder="Date"
                        name="date"
                        className="w-full mr-4"
                      />
                    </th>
                  </tr>
                  <tr>
                    <th className="w-[16.6%]">Device ID</th>
                    <th className="w-[16.6%]">Device Model</th>
                    <th className="w-[16.6%]">Value</th>
                    <th className="w-[16.6%]">Data Time</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="cursor-pointer">
                    <td>value</td>
                    <td>value</td>
                    <td>value</td>
                    <td>value</td>
                  </tr>
                  <tr className="cursor-pointer">
                    <td>value</td>
                    <td>value</td>
                    <td>value</td>
                    <td>value</td>
                  </tr>
                </tbody>
              </Table>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
