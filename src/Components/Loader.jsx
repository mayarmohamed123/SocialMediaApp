import { Spinner } from "@heroui/react";

export default function Loader() {
  return (
    <div className="flex justify-center items-center">
      <Spinner size="lg" color="primary" label="Loading..." />
    </div>
  );
}
