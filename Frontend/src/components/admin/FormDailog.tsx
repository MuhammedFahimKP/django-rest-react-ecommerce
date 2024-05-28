import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";

interface Props {
  children: React.ReactNode;
  title: string;
}

export default function FormDailog({ children, title }: Props) {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(!open);

  return (
    <>
      <Button placeholder={undefined} onClick={handleOpen}>
        Message Dialog
      </Button>
      <Dialog
        placeholder={undefined}
        open={open}
        size="xs"
        handler={handleOpen}
      >
        <div className="flex items-center justify-between">
          <DialogHeader
            placeholder={undefined}
            className="flex flex-col items-start"
          >
            <h1 className="text-2xl">{title}</h1>
          </DialogHeader>

          <DialogBody placeholder={undefined}>{children}</DialogBody>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="mr-3 h-5 w-5"
            onClick={handleOpen}
          >
            <path
              fillRule="evenodd"
              d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </Dialog>
    </>
  );
}
