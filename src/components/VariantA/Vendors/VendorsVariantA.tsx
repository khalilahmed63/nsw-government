import { Button, Table, Input, Badge, Box, Tooltip } from "@mantine/core";
import { Link } from "react-router-dom";
import { useState } from "react";
import LoadingLottie from "../../Global/Lottie/LoadingLottie";
import { BsExclamationCircle } from "react-icons/bs";

export default function VendorsVariantA(props: any) {
  const [search, setSearch] = useState<any>(false);
  const [result, setResult] = useState<any>([]);
  const [vendor, setVendor] = useState<any>();

  const searchRecord = (array: any, vendor: any) => {
    const matchingRecords = [];

    for (const object of array) {
      if (
        object.data?.vendorName.toLowerCase().includes(vendor.toLowerCase())
      ) {
        matchingRecords.push(object);
      }
    }

    if (matchingRecords.length > 0) {
      setResult(matchingRecords);
    } else {
      setResult([]);
    }

    return matchingRecords;
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
              onClick={props.refetch}
            >
              Reload
            </Button>
          </div>
        </div>
      ) : (
        <>
          <div className="p-6 flex justify-between">
            <p className="text-3xl font-bold">Vendor</p>
            <Link to="/vendors/new">
              <Button className="border-2 rounded-md border-[#202E61] text-[#202E61] hover:bg-[#202E61] hover:text-white">
                Onboard new vendor
              </Button>
            </Link>
          </div>
          <section>
            {props?.loading ? (
              <div className="pt-20 flex justify-center items-center h-full w-full">
                <LoadingLottie />
              </div>
            ) : (
              <div className="px-6">
                {props?.vendors.length > 0 ? (
                  <>
                    <div className="flex items-center mb-4">
                      <Input.Wrapper>
                        <Input
                          placeholder="Search vendor"
                          name="projectName"
                          className="w-96"
                          value={vendor}
                          onChange={(e) => {
                            setVendor(e.target.value);
                          }}
                        />
                      </Input.Wrapper>
                      <Button
                        sx={{
                          "&[data-disabled]": {
                            opacity: 0.9,
                            backgroundColor: "#26477B",
                          },
                        }}
                        disabled={!vendor}
                        className="border-2 border-[#202E61] bg-[#202E61] hover:bg-[#26477B] text-white -ml-[5.4rem]"
                        onClick={() => {
                          searchRecord(props?.vendors, vendor);
                          setSearch(true);
                        }}
                      >
                        Search
                      </Button>
                      <button
                        disabled={!search}
                        className="cursor-pointer text-sm text-[#202E61] font-bold underline underline-offset-2 ml-6"
                        onClick={() => {
                          setResult([]);
                          setVendor("");
                          setSearch(false);
                        }}
                      >
                        Clear filters
                      </button>
                    </div>
                    <Table
                      verticalSpacing="xs"
                      striped
                      fontSize="sm"
                      highlightOnHover
                    >
                      <thead>
                        <tr>
                          <th className="!w-[12.5%] !text-[#2E808E] !text-left">
                            Vendor
                          </th>
                          <th className="!w-[12.5%] !text-[#2E808E] !text-left">
                            Status
                          </th>
                          <th className="!w-[12.5%] !text-[#2E808E] !text-left">
                            Device models
                          </th>
                          <th className="!w-[12.5%] !text-[#2E808E] !text-left">
                            Devices
                          </th>
                          <th className="!w-[12.5%] !text-[#2E808E] !text-left">
                            TfNSW asset type
                          </th>
                          <th className="!w-[13%] !text-[#2E808E] !text-left">
                            Associated projects
                          </th>
                          <th className="!w-[12.5%] !text-[#2E808E] !text-left">
                            Last updated
                          </th>
                          <th className="!w-[12%] !text-[#2E808E] !text-left"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {search ? (
                          <>
                            {result?.length > 0 && (
                              <>
                                {result?.map((item: any) => (
                                  <tr key={item?.entityId}>
                                    <td>{item?.vendorName}</td>
                                    <td>
                                      {item?.vendorStatus === true ? (
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
                                      {item?.deviceGroup?.map(
                                        (item: any) => (
                                          <Link
                                            to={`/deviceGroups/${item.deviceGroupId}`}
                                          >
                                            <p>
                                              {item?.deviceGroupName || "-"}
                                            </p>
                                          </Link>
                                        )
                                      )}
                                    </td>
                                    <td>
                                      {item?.devices || (
                                        <p className="ml-6">-</p>
                                      )}
                                    </td>
                                    <td>
                                      {item?.devices || (
                                        <p className="ml-6">-</p>
                                      )}
                                    </td>
                                    <td>
                                      <div>
                                        {item?.project?.length > 0 ? (
                                          <>
                                            {item?.project?.map(
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
                                      {item?.updatedTimestamp?.slice(
                                        0,
                                        10
                                      ) || (
                                        <p className="text-center">
                                          {item?.createdTimestamp?.slice(
                                            0,
                                            10
                                          )}
                                        </p>
                                      )}
                                    </td>
                                    <td className="flex justify-end">
                                      <Link
                                        to={`/vendors/${item?.entityId}`}
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
                            {props?.vendors?.map((item: any) => (
                              <tr key={item?.entityId}>
                                <td>{item?.vendorName}</td>
                                <td>
                                  {item?.vendorStatus === true ? (
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
                                  {item?.deviceGroup?.map((item: any) => (
                                    <Link
                                      to={`/deviceGroups/${item.deviceGroupId}`}
                                    >
                                      <p>{item?.deviceGroupName || "-"}</p>
                                    </Link>
                                  ))}
                                </td>
                                <td>
                                  {item?.devices || (
                                    <p className="ml-6">-</p>
                                  )}
                                </td>
                                <td>
                                  {item?.devices || (
                                    <p className="ml-6">-</p>
                                  )}
                                </td>
                                <td>
                                  <div>
                                    {item?.project?.length > 0 ? (
                                      <>
                                        {item?.project?.map(
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
                                  {item?.updatedTimestamp?.slice(
                                    0,
                                    10
                                  ) || (
                                    <p className="text-center">
                                      {item?.createdTimestamp?.slice(
                                        0,
                                        10
                                      )}
                                    </p>
                                  )}
                                </td>
                                <td className="flex justify-end">
                                  <Link to={`/vendors/${item?.entityId}`}>
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
                  </>
                ) : (
                  <>
                    <p className="text-4xl text-red-500 font-bold text-center mt-20">
                      No vendors
                    </p>
                  </>
                )}
              </div>
            )}
          </section>
        </>
      )}
    </>
  );
}
