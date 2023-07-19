import { Button, Table, Select } from "@mantine/core";
import { IconChevronDown } from "tabler-icons";
import { useNavigate } from "react-router-dom";
import LoadingLottie from "../../Global/Lottie/LoadingLottie";

export default function ReportsVariantA(props: any) {
  const navigate = useNavigate();

  return (
    <>
      <div className="p-6 flex justify-between ">
        <p className="text-3xl font-bold">Reports</p>
      </div>
      <section>
        {props?.loading ? (
          <div className="pt-20 flex justify-center items-center h-full w-full">
            <LoadingLottie />
          </div>
        ) : (
          <div className="px-6">
            <div className="mb-4 flex items-end">
              <Select
                label="Project"
                placeholder="project name"
                searchable
                rightSection={<IconChevronDown size="1rem" />}
                nothingFound="No options"
                className="w-44 mr-4"
                data={["React", "Angular", "Svelte", "Vue"]}
              />
              <div className="flex items-center">
                <Button className="bg-[#202E61] mr-4 text-sm">Apply</Button>
                <p className="text-sm cursor-pointer text-[#202E61] font-bold underline underline-offset-2">
                  Clear filters
                </p>
              </div>
            </div>
            <div className="">
              <Table
                verticalSpacing="xs"
                striped
                fontSize="sm"
                highlightOnHover
              >
                <thead>
                  <tr>
                    <th className="w-[33.33%] !text-[#2E808E]">Report name</th>
                    <th className="w-[33.33%] !text-[#2E808E]">Project name</th>
                    <th className="w-[33.33%] !text-[#2E808E]">Last updated</th>
                  </tr>
                </thead>
                <tbody>
                  {props?.reports.map((item: any) => (
                    <tr
                      key={item?.wbs}
                      className="cursor-pointer"
                      onClick={() => {
                        navigate(`/reports/${item?.wbs}`);
                      }}
                    >
                      <td>{item?.department}</td>
                      <td>{item?.department}</td>
                      <td>{item?.department}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </div>
        )}
      </section>
    </>
  );
}
