import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
} from "@heroui/react";

export default function PostEditModal({
  isOpen,
  onClose,
  editText,
  setEditText,
  setEditImage,
  isUpdating,
  handleUpdatePost,
}) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalHeader>Edit Post</ModalHeader>
        <ModalBody>
          <Input
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            placeholder="Update your post text..."
            variant="bordered"
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setEditImage(e.target.files[0])}
            className="mt-2"
          />
        </ModalBody>
        <ModalFooter>
          <Button variant="light" onPress={onClose}>
            Cancel
          </Button>
          <Button
            isLoading={isUpdating}
            onPress={() => handleUpdatePost()}
            className="bg-[hsl(var(--primary))] text-white">
            Save Changes
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
