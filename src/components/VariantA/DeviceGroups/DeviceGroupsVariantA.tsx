import { Button, Table, Select, Badge, Box, Tooltip } from "@mantine/core";
import { IconChevronDown } from "tabler-icons";
import { useState } from "react";
import { Link } from "react-router-dom";
import LoadingLottie from "../../Global/Lottie/LoadingLottie";
import { BsExclamationCircle } from "react-icons/bs";

export default function DeviceGroupVariantA(props: any) {
  const [deviceGroup, setDeviceGroup] = useState<any>();
  const [vendor, setVendor] = useState<any>();
  const [result, setResult] = useState<any>([]);
  const [search, setSearch] = useState<any>(false);

  const searchRecord = (array: any, vendor: any, deviceGroup: any) => {
    setSearch(true);
    for (const object of array) {
      if (
        object.deviceGroupId === deviceGroup ||
        object.data?.vendorName === vendor
      ) {
        setResult([object]);
        return;
      } else {
        setResult([]);
      }
    }
    return null;
  };
  return (
    <>
      {props?.error ? (
        <div className="w-full h-screen -mt-20 flex justify-center items-center ">
          <div className="flex flex-col justify-center items-center">
            <BsExclamationCircle
              className="cursor-pointer mr-2"
              fontSize="large"
              size={100}
            />
            <p className="text-6xl font-bold">oops...!</p>
            <p className="text-xl my-2">Something went wrong</p>
            <Button
              className="border bg-[#202E61] hover:border-[#202E61] hover:bg-[#26477B] text-white"
              // onClick={reload()}
            >
              Reload
            </Button>
          </div>
        </div>
      ) : (
        <>
          <div className="p-6 flex justify-between ">
            <p className="text-3xl font-bold">Device Model</p>
            <Link to="/deviceGroups/new">
              <Button className="border-2 rounded-md border-[#202E61] text-[#202E61] hover:bg-[#202E61] hover:text-white">
                New device model
              </Button>
            </Link>
          </div>
          <section>
            {props?.loading ? (
              <div className="pt-20 flex justify-center items-center h-full w-full">
                <LoadingLottie />
              </div>
            ) : (
              <div>
                {props?.deviceGroups.length > 0 ? (
                  <div className="px-6">
                    <div className="mb-4 flex items-end">
                      <Select
                        label="Device model"
                        placeholder="Select device model"
                        searchable
                        // rightSection={<IconChevronDown size="1rem" />}
                        nothingFound="No options"
                        className="w-44 mr-4"
                        data={props?.deviceGroupList}
                        value={deviceGroup}
                        onChange={setDeviceGroup}
                      />
                      <Select
                        label="Vendor"
                        placeholder="Select vendor name"
                        searchable
                        // rightSection={<IconChevronDown size="1rem" />}
                        nothingFound="No options"
                        className="w-44 mr-4"
                        data={props?.vendorList}
                        value={vendor}
                        onChange={setVendor}
                      />
                      <div className="flex items-center">
                        <Button
                          disabled={!deviceGroup && !vendor && !deviceGroup}
                          className="bg-[#202E61] border border-[#202E61] hover:bg-[#26477B] text-white mr-4"
                          onClick={() => {
                            searchRecord(
                              props?.deviceGroups,
                              vendor,
                              deviceGroup
                            );
                          }}
                        >
                          Apply
                        </Button>
                        <button
                          disabled={!search}
                          className="cursor-pointer text-sm text-[#202E61] font-bold underline underline-offset-2"
                          onClick={() => {
                            setResult([]);
                            setVendor("");
                            setDeviceGroup("");
                            setSearch(false);
                          }}
                        >
                          Clear filters
                        </button>
                      </div>
                    </div>
                    <div>
                      <Table
                        verticalSpacing="xs"
                        striped
                        fontSize="sm"
                        highlightOnHover
                      >
                        <thead>
                          <tr>
                            <th className="w-[16.6%] !text-[#2E808E]">
                              Device model
                            </th>
                            <th className="w-[16.6%] !text-[#2E808E]">
                              Status
                            </th>
                            <th className="w-[16.6%] !text-[#2E808E]">
                              Device provisioned
                            </th>
                            <th className="w-[16.6%] !text-[#2E808E]">
                              Vendor
                            </th>
                            <th className="w-[16.6%] !text-[#2E808E]">
                              Associated with project
                            </th>
                            <th className="w-[16.6%] !text-[#2E808E]">
                              Last updated
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {search ? (
                            <>
                              {result.length > 0 && (
                                <>
                                  {result?.map((item: any) => (
                                    <tr key={item?.data?.id}>
                                      <td>
                                        {item?.data?.deviceGroupName || (
                                          <p className="text-center">-</p>
                                        )}
                                      </td>
                                      <td>
                                        {item?.data?.deviceGroupStatus ===
                                        true ? (
                                          <p className=" text-black bg-green-200 text-xs w-fit mt-1 px-2 rounded-full">
                                            Active
                                          </p>
                                        ) : (
                                          <p className=" text-black bg-red-200 text-xs w-fit mt-1 px-2 rounded-full">
                                            Inactive
                                          </p>
                                        )}
                                      </td>
                                      <td>
                                        {item?.data?.vendorName || (
                                          <p className="text-center">-</p>
                                        )}
                                      </td>
                                      <td>
                                        {item?.data?.vendor?.map(
                                          (item: any) => (
                                            <Link
                                              to={`/vendors/${item.vendorId}`}
                                            >
                                              <p>
                                                {item?.vendorName || (
                                                  <p className="text-center">
                                                    -
                                                  </p>
                                                )}
                                              </p>
                                            </Link>
                                          )
                                        )}
                                      </td>
                                      <td>
                                        <div>
                                          {item?.data?.project?.length > 0 ? (
                                            <>
                                              {item?.data?.project?.map(
                                                (item: any) => (
                                                  <Tooltip
                                                    label="Shared Projects"
                                                    events={{
                                                      hover: item?.shared
                                                        ? true
                                                        : false,
                                                      focus: false,
                                                      touch: false,
                                                    }}
                                                    className="mb-2"
                                                  >
                                                    <Box mr="md">
                                                      <Badge
                                                        variant="filled"
                                                        fullWidth
                                                        className={`${
                                                          item?.shared &&
                                                          "!border-2 border-black"
                                                        }`}
                                                      >
                                                        <Link
                                                          to={`/projects/${item?.projectId}`}
                                                        >
                                                          {item?.projectName}
                                                        </Link>
                                                      </Badge>
                                                    </Box>
                                                  </Tooltip>
                                                )
                                              )}
                                            </>
                                          ) : (
                                            <p className="text-center">-</p>
                                          )}
                                        </div>
                                      </td>
                                      <td>
                                        {item?.data?.timestamp?.slice(0, 10) ||
                                          item?.data?.createdTimestamp?.slice(
                                            0,
                                            10
                                          )}
                                      </td>
                                      <td className="flex justify-end">
                                        <Link
                                          to={`/deviceGroups/${item?.data?.entityId}`}
                                        >
                                          <Button className="border-2 border-[#202E61] rounded-md text-[#202E61] hover:text-white hover:bg-[#202E61]">
                                            Manage
                                          </Button>
                                        </Link>
                                      </td>
                                    </tr>
                                  ))}
                                </>
                              )}
                            </>
                          ) : (
                            <>
                              {props?.deviceGroups?.map((item: any) => (
                                <tr key={item?.data?.id}>
                                  <td>
                                    {item?.data?.deviceGroupName || (
                                      <p className="text-center">-</p>
                                    )}
                                  </td>
                                  <td>
                                    {item?.data?.deviceGroupStatus === true ? (
                                      <p className=" text-black bg-green-200 text-xs w-fit mt-1 px-2 rounded-full">
                                        Active
                                      </p>
                                    ) : (
                                      <p className=" text-black bg-red-200 text-xs w-fit mt-1 px-2 rounded-full">
                                        Inactive
                                      </p>
                                    )}
                                  </td>
                                  <td>
                                    {item?.data?.vendorName || (
                                      <p className="text-center">-</p>
                                    )}
                                  </td>
                                  <td>
                                    {item?.data?.vendor?.map((item: any) => (
                                      <Link to={`/vendors/${item.vendorId}`}>
                                        <p>
                                          {item?.vendorName || (
                                            <p className="text-center">-</p>
                                          )}
                                        </p>
                                      </Link>
                                    ))}
                                  </td>
                                  <td>
                                    <div>
                                      {item?.data?.project?.length > 0 ? (
                                        <>
                                          {item?.data?.project?.map(
                                            (item: any) => (
                                              <Tooltip
                                                label="Shared Projects"
                                                events={{
                                                  hover: item?.shared
                                                    ? true
                                                    : false,
                                                  focus: false,
                                                  touch: false,
                                                }}
                                                className="mb-2"
                                              >
                                                <Box mr="md">
                                                  <Badge
                                                    variant="filled"
                                                    fullWidth
                                                    className={`${
                                                      item?.shared &&
                                                      "!border-2 border-black"
                                                    }`}
                                                  >
                                                    <Link
                                                      to={`/projects/${item?.projectId}`}
                                                    >
                                                      {item?.projectName}
                                                    </Link>
                                                  </Badge>
                                                </Box>
                                              </Tooltip>
                                            )
                                          )}
                                        </>
                                      ) : (
                                        <p className="text-center">-</p>
                                      )}
                                    </div>
                                  </td>
                                  <td>
                                    {item?.data?.timestamp?.slice(0, 10) ||
                                      item?.data?.createdTimestamp?.slice(
                                        0,
                                        10
                                      )}
                                  </td>
                                  <td className="flex justify-end">
                                    <Link
                                      to={`/deviceGroups/${item?.data?.entityId}`}
                                    >
                                      <Button className="border-2 border-[#202E61] rounded-md text-[#202E61] hover:text-white hover:bg-[#202E61]">
                                        Manage
                                      </Button>
                                    </Link>
                                  </td>
                                </tr>
                              ))}
                            </>
                          )}
                        </tbody>
                      </Table>
                      {search && result.length <= 0 && (
                        <p className="text-4xl text-red-500 font-bold text-center mt-20">
                          Record not found
                        </p>
                      )}
                    </div>
                  </div>
                ) : (
                  <p className="text-4xl text-red-500 font-bold text-center mt-20">
                    No deviceGroups
                  </p>
                )}
              </div>
            )}
          </section>
        </>
      )}
    </>
  );
}
