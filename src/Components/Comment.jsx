import {
  Avatar,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
} from "@heroui/react";
import { EllipsisVertical } from "lucide-react";
import { authContext } from "../Contexts/AuthContext";
import { useContext, useState } from "react";
import {
  deleteCommentApi,
  updateCommentApi,
} from "../Services/commentsServices";

export default function PostComment({ comment, getSinglePost }) {
  const { userData } = useContext(authContext);
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const [newCommentContent, setNewCommentContent] = useState(comment.content);
  const [isLoading, setIsLoading] = useState(false);

  async function handleDeleteComment() {
    const response = await deleteCommentApi(comment._id);
    console.log(response);
    if (response.message === "success") {
      getSinglePost();
    }
  }

  async function handleUpdateComment() {
    setIsLoading(true);
    const response = await updateCommentApi(comment._id, newCommentContent);
    if (response.message == "success") {
      setIsUpdateMode(false);
      getSinglePost();
    }
  }

  if (!comment || !comment._id || !comment.commentCreator) return null;
  return (
    <div className="flex justify-between items-center gap-3 p-3 mt-3 dark:bg-gray-800 bg-gray-50 rounded-lg shadow-sm border border-gray-200 hover:bg-gray-100 transition">
      <div className="flex items-start gap-3">
        <Avatar
          src={comment.commentCreator.photo}
          name={comment.commentCreator.name}
          size="sm"
          className="flex-shrink-0"
        />
        <div className="flex flex-col">
          <p className="text-sm font-semibold dark:text-white text-gray-800">
            {comment.commentCreator.name}
          </p>
          {isUpdateMode ? (
            <div className="ps-12 pt-3">
              <Input
                isDisabled={isLoading}
                variant="bordered"
                value={newCommentContent}
                onChange={(e) => setNewCommentContent(e.target.value)}
              />
              <div className="mt-2 flex justify-end gap-2">
                <Button
                  color="primary"
                  variant="bordered"
                  onPress={handleUpdateComment}
                  isLoading={isLoading}
                  isDisabled={newCommentContent.trim().length < 2}>
                  Update
                </Button>
                <Button
                  onPress={() => setIsUpdateMode(false)}
                  color="danger"
                  variant="bordered">
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <p className="text-sm text-gray-600">{comment.content}</p>
          )}
        </div>
      </div>
      {userData._id === comment.commentCreator._id && (
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Button
              isIconOnly
              variant="light"
              radius="full"
              aria-label="More options">
              <EllipsisVertical size={20} />
            </Button>
          </DropdownTrigger>
          <DropdownMenu>
            <DropdownItem onPress={() => setIsUpdateMode(true)} key="edit">
              ✏️ Edit comment
            </DropdownItem>
            <DropdownItem
              onPress={handleDeleteComment}
              key="delete"
              className="text-danger">
              🗑 Delete comment
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      )}
    </div>
  );
}
