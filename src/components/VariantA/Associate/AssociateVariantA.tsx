/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { IconCheck, IconCopy, IconX } from "tabler-icons";
import { TbCertificate } from "react-icons/tb";
import { RxCross2 } from "react-icons/rx";
import { BsCheckLg, BsKeyFill } from "react-icons/bs";
import {
  ActionIcon,
  Badge,
  Box,
  Button,
  Card,
  CopyButton,
  LoadingOverlay,
  Select,
  Switch,
  Tooltip,
  rem,
} from "@mantine/core";
import axios from "axios";
import InfoRoundedIcon from "@mui/icons-material/InfoRounded";
import Empty from "../../Global/Common/Empty";
import "react-toastify/dist/ReactToastify.css";

export default function AssociateVariantA(props: any) {
  const location = useLocation();
  const { deviceGroupId } = useParams();

  const projectsAPI = process.env.REACT_APP_API_PROJECTS;
  const deviceGroupsAPI = process.env.REACT_APP_API_DEVICE_GROUPS;
  const vendorsAPI = process.env.REACT_APP_API_VENDORS;
  const associateAPI = process.env.REACT_APP_API_ASSOCIATE;
  const disassociateAPI = process.env.REACT_APP_API_DISASSOCIATE;
  const downloadAsset = process.env.REACT_APP_API_DOWNLOAD_ASSET;

  const [project, setProject] = useState<any>(null);
  const [projects, setProjects] = useState<any>([]);
  const [projectToShare, setProjectToShare] = useState<any>([]);
  const [projectLoading, setProjectLoading] = useState(false);
  // const [vendor, setVendor] = useState<any>(null);
  const [vendors, setVendors] = useState<any>([]);
  const [vendorLoading, setVendorLoading] = useState(false);
  const [deviceGroup, setDeviceGroup] = useState<any>(null);
  const [deviceGroups, setDeviceGroups] = useState<any>([]);
  const [deviceGroupLoading, setDeviceGroupLoading] = useState(false);
  const [deviceGroupShared, setDeviceGroupShared] = useState(false);
  const [openedToolTip, setOpenedToolTip] = useState(false);

  const fetchProjects = async () => {
    const response = await axios.get(`${projectsAPI}`);
    setProjects(response?.data);
  };

  const fetchDeviceGroups = async () => {
    const response = await axios.get(`${deviceGroupsAPI}`);
    setDeviceGroups(response.data);
  };

  // const fetchVendors = async () => {
  //   const response = await axios.get(`${vendorsAPI}`);
  //   setVendors(response.data);
  // };

  const projectList = projects?.map((project: any) => ({
    value: project.projectId,
    label:
      project?.data?.projectName ||
      deviceGroup?.data?.shortProjectName ||
      "Unknown",
  }));

  // const deviceGroupList = deviceGroups?.map((deviceGroup: any) => ({
  //   value: deviceGroup.deviceGroupId,
  //   label: deviceGroup.data.deviceGroupName || "Unknown",
  // }));

  // const vendorList = vendors.map((vendor: any) => ({
  //   value: vendor.vendorId,
  //   label: vendor.data.vendorName || "Unknown",
  // }));

  const filterProjects = projectList?.filter(
    (item: any) =>
      !props?.projects?.some((obj: any) => obj?.projectId === item?.value)
  );

  const associatedProjects = props?.projects?.filter(
    (item: any) => item?.shared !== true
  );

  const associatedProjectList = associatedProjects?.map((project: any) => ({
    value: project.projectId,
    label: project?.projectName || "Unknown",
  }));

  // const filterDeviceGroups = deviceGroupList?.filter(
  //   (item: any) =>
  //     !props?.deviceGroups?.some(
  //       (obj: any) => obj?.deviceGroupId === item?.value
  //     )
  // );

  // const filterVendors = vendorList?.filter(
  //   (item: any) =>
  //     !props?.vendors?.some((obj: any) => obj?.vendorId === item?.value)
  // );

  const associate = async (formData: any) => {
    try {
      const response = await axios.post(`${associateAPI}`, {
        eventType: "associate",
        eventSubType: `${formData?.subType}`,
        entityId: `${formData?.entityId}`,
        parentEntityId: `${formData?.parentEntityId}`,
        shared: `${formData?.deviceGroupShared}`,
        projectToShare: `${projectToShare}`,
      });
      if (response?.status === 200) {
        let notify = () =>
          toast("Relationship has been established successfully");
        setProjectLoading(false);
        setDeviceGroupLoading(false);
        setVendorLoading(false);
        notify();
        props.fetch();
      }
    } catch (error) {
      console.log(error);
      setProjectLoading(false);
      setDeviceGroupLoading(false);
      setVendorLoading(false);
    }
  };

  const disassociate = async (formData: any) => {
    try {
      const response = await axios.post(`${disassociateAPI}`, {
        eventType: "disassociate",
        eventSubType: `${formData?.subType}`,
        entityId: `${formData?.entityId}`,
        parentEntityId: `${formData?.parentEntityId}`,
      });
      if (response?.status === 200) {
        let notify = () =>
          toast("Relationship has been disassociate successfully");
        setProjectLoading(false);
        setDeviceGroupLoading(false);
        setVendorLoading(false);
        notify();
        props?.fetch();
      }
    } catch (error) {
      console.log(error);
      setProjectLoading(false);
      setDeviceGroupLoading(false);
      setVendorLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
    fetchDeviceGroups();
    // fetchVendors();
  }, []);

  return (
    <div className="flex flex-col justify-between my-8">
      <Card
        sx={(theme: any) => ({
          backgroundColor:
            theme.colorScheme === "dark" ? theme.colors.gray[8] : "#F9FAFB",
          color: theme.colorScheme === "dark" ? "white" : "black",
        })}
        p={0}
        radius={0}
        className="rounded-t"
      >
        <Card
          sx={(theme: any) => ({
            backgroundColor:
              theme.colorScheme === "dark" ? "#5C5F66" : "#E5E7EB",
            color: theme.colorScheme === "dark" ? "white" : "black",
          })}
          p={0}
          radius={0}
          className="p-4 w-full rounded-t"
        >
          <h1 className="text-sm font-bold">{props?.title}</h1>
        </Card>
        <div className="p-4">
          {props?.edit && (
            <div className="w-full mt-4">
              {location.pathname.endsWith(
                `/deviceGroups/edit/${deviceGroupId}`
              ) && (
                  <>
                    <>
                      {props?.project && (
                        <div className="flex items-center">
                          <Select
                            label="Project"
                            placeholder="Select Project"
                            defaultValue=""
                            data={filterProjects}
                            name="project"
                            onChange={setProject}
                            value={project}
                            readOnly={!props?.edit}
                            className="sm:mr-4 mb-8 w-80"
                          />
                          <Button
                            type="button"
                            className="ml-4 mb-2 border bg-[#202E61] hover:border-[#202E61] hover:bg-transparent hover:text-[#202E61]"
                            disabled={!project}
                            onClick={() => {
                              associate({
                                entityId: props?.deviceGroupId || props?.vendorId,
                                subType: `${props?.projectSubType}`,
                                parentEntityId: `${project}`,
                              });
                              setProjectLoading(true);
                            }}
                          >
                            <LoadingOverlay
                              visible={projectLoading}
                              overlayBlur={2}
                            />
                            Associate
                          </Button>
                        </div>
                      )}
                    </>
                  </>
                )}
              {/* {props?.deviceGroup && (
                <div className="flex items-center">
                  <Select
                    label="Device model"
                    placeholder="Select Device model"
                    defaultValue=""
                    data={filterDeviceGroups}
                    name="deviceGroup"
                    onChange={setDeviceGroup}
                    value={deviceGroup}
                    readOnly={!props?.edit}
                    className="sm:mr-4 mb-8 w-80"
                  />
                  <Button
                    type="button"
                    className="ml-4 mb-2 border bg-[#202E61] hover:border-[#202E61] hover:bg-transparent hover:text-[#202E61]"
                    disabled={!deviceGroup}
                    onClick={() => {
                      associate({
                        entityId: deviceGroup,
                        subType: `${props?.deviceGroupSubType}`,
                        parentEntityId: `${
                          props?.vendorId || props?.projectId
                        }`,
                      });
                      setDeviceGroupLoading(true);
                    }}
                  >
                    <LoadingOverlay
                      visible={deviceGroupLoading}
                      overlayBlur={2}
                    />
                    Associate
                  </Button>
                </div>
              )} */}
              {/* {props?.vendor && (
                <div className="flex items-center">
                  <Select
                    label="Vendor"
                    placeholder="Select Vendor"
                    defaultValue=""
                    data={filterVendors}
                    name="vendor"
                    onChange={setVendor}
                    value={vendor}
                    readOnly={!props?.edit}
                    className="sm:mr-4 mb-8 w-80"
                  />
                  <Button
                    type="button"
                    className="ml-4 mb-2 border bg-[#202E61] hover:border-[#202E61] hover:bg-transparent hover:text-[#202E61]"
                    disabled={!vendor}
                    onClick={() => {
                      associate({
                        entityId: props?.deviceGroupId || vendor,
                        subType: `${props?.vendorSubType}`,
                        parentEntityId: `${props?.projectId || vendor}`,
                      });
                      setVendorLoading(true);
                    }}
                  >
                    <LoadingOverlay visible={vendorLoading} overlayBlur={2} />
                    Associate
                  </Button>
                </div>
              )} */}
            </div>
          )}

          {props?.project && (
            <Card
              p={0}
              radius={0}
              className="p-4 my-4 w-full h-[10rem] mx-6 md:mx-0 overflow-auto rounded"
            >
              <LoadingOverlay
                visible={false}
                overlayBlur={2}
                className="!z-0"
              />
              <div>
                <div className="flex py-2">
                  <div className="w-[70%] ">
                    <p className="text-sm font-semibold ">Project</p>
                  </div>
                </div>
                {props?.projects?.length > 0 ? (
                  <div className="mt-2 flex flex-wrap">
                    {props?.projects?.map((item: any) => (
                      <div>
                        <Tooltip
                          label="Shared Projects"
                          events={{
                            hover: item?.shared ? true : false,
                            focus: false,
                            touch: false,
                          }}
                          className="mb-2"
                        >
                          <Box mr="md">
                            <Badge
                              variant="filled"
                              fullWidth
                              className={`${item?.shared && "!border-2 border-black"
                                }`}
                              rightSection={
                                props?.edit ? (
                                  <ActionIcon
                                    size="xs"
                                    color="blue"
                                    radius="xl"
                                    variant="transparent"
                                    className="ml-2"
                                    onClick={() => {
                                      disassociate({
                                        entityId:
                                          props?.deviceGroupId ||
                                          props?.vendorId,
                                        subType: `${props?.disassociateProjectSubType}`,
                                        parentEntityId: `${item?.projectId}`,
                                      });
                                    }}
                                  >
                                    <IconX
                                      size={rem(15)}
                                      className="text-white"
                                    />
                                  </ActionIcon>
                                ) : (
                                  location.pathname.endsWith(
                                    `/deviceGroups/${deviceGroupId}`
                                  ) && (
                                    <div className="flex items-center">
                                      <a
                                        href={`${downloadAsset}${item?.certificate?.certificate?.secretName} `}
                                        rel="noreferrer"
                                      >
                                        <Tooltip label="Download certificate">
                                          <ActionIcon
                                            size="xs"
                                            className="ml-2"
                                          >
                                            <TbCertificate className="text-white hover:text-blue-400" />
                                          </ActionIcon>
                                        </Tooltip>
                                      </a>
                                      <a
                                        href={`${downloadAsset}${item?.certificate?.privateKey?.secretName}`}
                                        rel="noreferrer"
                                      >
                                        <Tooltip label="Download key">
                                          <ActionIcon
                                            size="xs"
                                            className="ml-2"
                                          >
                                            <BsKeyFill className="text-white hover:text-blue-400" />
                                          </ActionIcon>
                                        </Tooltip>
                                      </a>
                                    </div>
                                  )
                                )
                              }
                            >
                              <Link to={`/projects/${item?.projectId}`}>
                                {item?.projectName}
                              </Link>
                            </Badge>
                          </Box>
                        </Tooltip>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="mt-4 text-2xl font-bold text-center text-red-500 ">
                    No related project
                  </p>
                )}
              </div>
            </Card>
          )}
          {props?.deviceGroup && (
            <Card
              p={0}
              radius={0}
              className="p-4 my-4 w-full h-[10rem] mx-6 md:mx-0 overflow-auto rounded"
            >
              <LoadingOverlay
                visible={false}
                overlayBlur={2}
                className="!z-0"
              />
              <div>
                <div className="flex py-2">
                  <div className="w-[70%] ">
                    <p className="text-sm font-semibold ">Device model</p>
                  </div>
                </div>
                {props?.deviceGroups?.length > 0 ? (
                  <div className="mt-2 flex flex-wrap">
                    {props?.deviceGroups?.map((item: any) => (
                      <Box mr="md">
                        <Badge
                          variant="filled"
                          fullWidth
                          rightSection={
                            props?.edit && (
                              <ActionIcon
                                size="xs"
                                color="blue"
                                radius="xl"
                                variant="transparent"
                                className="ml-2"
                                onClick={() => {
                                  disassociate({
                                    entityId: item?.deviceGroupId,
                                    subType: `${props?.disassociateDeviceGroupSubType}`,
                                    parentEntityId: `${props?.vendorId || props?.projectId
                                      }`,
                                  });
                                }}
                              >
                                <IconX size={rem(15)} className="text-white" />
                              </ActionIcon>
                            )
                          }
                        >
                          <Link to={`/deviceGroups/${item?.deviceGroupId}`}>
                            {item?.deviceGroupName}
                          </Link>
                        </Badge>
                      </Box>
                    ))}
                  </div>
                ) : (
                  <p className="mt-4 text-2xl font-bold text-center text-red-500 ">
                    No related deviceGroup
                  </p>
                )}
              </div>
            </Card>
          )}
          {props?.vendor && (
            <Card
              p={0}
              radius={0}
              className="p-4 my-4 w-full h-[10rem] mx-6 md:mx-0 overflow-auto rounded"
            >
              <LoadingOverlay
                visible={false}
                overlayBlur={2}
                className="!z-0"
              />
              <div>
                <div className="flex py-2">
                  <div className="w-[70%] ">
                    <p className="text-sm font-semibold ">Vendor</p>
                  </div>
                </div>
                {props?.vendors?.length > 0 ? (
                  <div className="mt-2 flex flex-wrap">
                    {props?.vendors?.map((item: any) => (
                      <Box mr="md">
                        <Badge
                          variant="filled"
                          fullWidth
                          rightSection={
                            props?.edit && (
                              <ActionIcon
                                size="xs"
                                color="blue"
                                radius="xl"
                                variant="transparent"
                                className="ml-2"
                                onClick={() => {
                                  disassociate({
                                    entityId:
                                      props?.deviceGroupId || item?.vendorId,
                                    subType: `${props?.disassociateVendorSubType}`,
                                    parentEntityId: `${props?.projectId || item?.vendorId
                                      }`,
                                  });
                                }}
                              >
                                <IconX size={rem(15)} className="text-white" />
                              </ActionIcon>
                            )
                          }
                        >
                          <Link to={`/vendors/${item?.vendorId}`}>
                            {item?.vendorName}
                          </Link>
                        </Badge>
                      </Box>
                    ))}
                  </div>
                ) : (
                  <p className="mt-4 text-2xl font-bold text-center text-red-500 ">
                    No related vendor
                  </p>
                )}
              </div>
            </Card>
          )}
        </div>
      </Card>
    </div>
  );
}
