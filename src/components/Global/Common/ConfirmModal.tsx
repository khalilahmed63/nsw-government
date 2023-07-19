import { Modal, useMantineTheme } from "@mantine/core";

export default function ConfirmModal(props: any) {
  const theme = useMantineTheme();
  return (
    <Modal
      size="lg"
      opened={props.opened}
      onClose={props.close}
      withCloseButton={props.closeButton}
      centered
      overlayProps={{
        color:
          theme.colorScheme === "dark"
            ? theme.colors.dark[9]
            : theme.colors.gray[2],
        opacity: 0.55,
        blur: 3,
      }}
    >
      {props.children}
    </Modal>
  );
}
