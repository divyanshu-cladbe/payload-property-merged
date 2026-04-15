import { X } from "lucide-react";
import ClickAwayListener from "react-click-away-listener";

type MobileSideMenuProps = {
    showSideMenu: boolean;
    setShowSideMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

export const MobileSideMenu = ({ showSideMenu, setShowSideMenu }: MobileSideMenuProps) => {

    const handleCloseSideMenu = () => {
        setShowSideMenu(false);
    }

    return (
        <ClickAwayListener onClickAway={handleCloseSideMenu}>
            <div className={`
                absolute bg-white left-0 top-0 h-full w-72 z-50
                transition-transform duration-300 ease-in-out
                ${showSideMenu ? 'translate-x-0' : '-translate-x-full'}
            `}>
                <div className="flex justify-end p-4">
                     <X onClick={handleCloseSideMenu} />
                </div>
            </div>
        </ClickAwayListener>
    )
}