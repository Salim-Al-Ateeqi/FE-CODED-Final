import React from "react";
import { observer } from "mobx-react";
import { AlertDialog, Button } from "native-base";

// components
import { Colors } from "../../assets/Theme/Colors";

// stores
import authStore from "../../stores/authStore";

const AlertOnDelete = ({
  group,
  openAlert,
  setOpenAlert,
  handleLeave,
  handleDelete,
}) => {
  const CloseAlert = () => setOpenAlert(false);
  const cancelRef = React.useRef(null);

  return (
    <AlertDialog
      leastDestructiveRef={cancelRef}
      isOpen={openAlert}
      onClose={CloseAlert}
    >
      <AlertDialog.Content>
        <AlertDialog.CloseButton />
        <AlertDialog.Header>
          {authStore.user._id === group.owner ? "Delete Group" : "Exit Group"}
        </AlertDialog.Header>
        <AlertDialog.Body>
          {authStore.user._id === group.owner
            ? "Are you sure you want to delete this group? You can't undo this action."
            : "Are you sure you want to exit this group? You will no longer receive new messages."}
        </AlertDialog.Body>
        <AlertDialog.Footer>
          <Button.Group space={3}>
            <Button
              variant="ghost"
              colorScheme="coolGray"
              onPress={CloseAlert}
              ref={cancelRef}
            >
              Cancel
            </Button>
            {authStore.user._id === group.owner ? (
              <Button
                style={{ backgroundColor: Colors.danger }}
                onPress={handleDelete}
              >
                Delete
              </Button>
            ) : (
              <Button
                style={{ backgroundColor: Colors.danger }}
                onPress={handleLeave}
              >
                Exit
              </Button>
            )}
          </Button.Group>
        </AlertDialog.Footer>
      </AlertDialog.Content>
    </AlertDialog>
  );
};

export default observer(AlertOnDelete);
