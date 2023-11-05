import Image from "next/image";
import { Button } from "../ui/button";
import { redirect } from "next/navigation";

function ProfileButtons() {
  return (
    <div className="ml-auto flex gap-2">
      <Button
        className="bg-slate-800 cursor-pointer hover:bg-slate-600"
        title="share"
      >
        <Image
          src="/assets/icons/share.svg"
          alt="edit recipe"
          height={20}
          width={20}
          className="invert"
        />
      </Button>
      <div className="flex gap-2">
        <Button
          className="bg-slate-800 cursor-pointer hover:bg-slate-600"
          title="edit"
        >
          <Image
            src="/assets/icons/edit.svg"
            alt="edit recipe"
            height={20}
            width={20}
            className="invert"
          />
        </Button>
      </div>
    </div>
  );
}

export default ProfileButtons;
