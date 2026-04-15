import { Button } from "@/components/ui/button";

type ViewFullDetailButtonProps = {
  handleFullDetailButtonClick: (e: React.MouseEvent) => void;
};

export const ViewFullDetailButton = ({
  handleFullDetailButtonClick,
}: ViewFullDetailButtonProps) => {
  return (
    <div className="flex min-h-[48px] sm:min-h-[54px] mt-2 mb-1 pb-1">
      <Button
        onClick={handleFullDetailButtonClick}
        className="w-full sm:w-full h-[40px] sm:h-[40px] text-sm sm:text-base"
      >
        Go to project
      </Button>
    </div>
  );
};